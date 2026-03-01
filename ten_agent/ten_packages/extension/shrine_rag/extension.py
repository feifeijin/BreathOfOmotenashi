from ten import Extension, TenEnv, Data
import httpx


BACKEND_URL = "http://backend:8000"
SEARCH_ENDPOINT = f"{BACKEND_URL}/api/knowledge/search"
TOP_K = 3
HTTP_TIMEOUT = 5.0


class ShrineRagExtension(Extension):
    def on_start(self, ten_env: TenEnv) -> None:
        ten_env.log_info("shrine_rag: starting")
        ten_env.on_start_done()

    def on_stop(self, ten_env: TenEnv) -> None:
        ten_env.log_info("shrine_rag: stopping")
        ten_env.on_stop_done()

    def on_data(self, ten_env: TenEnv, data: Data) -> None:
        try:
            user_text = data.get_property_string("text")
        except Exception:
            ten_env.log_warn("shrine_rag: failed to read text property")
            ten_env.send_data(data)
            return

        enriched_text = self._enrich(ten_env, user_text)

        output = Data.create("text_data")
        output.set_property_string("text", enriched_text)

        # Forward is_final flag if present
        try:
            is_final = data.get_property_bool("is_final")
            output.set_property_bool("is_final", is_final)
        except Exception:
            pass

        ten_env.send_data(output)

    def _enrich(self, ten_env: TenEnv, user_text: str) -> str:
        try:
            resp = httpx.post(
                SEARCH_ENDPOINT,
                json={"query": user_text, "top_k": TOP_K},
                timeout=HTTP_TIMEOUT,
            )
            resp.raise_for_status()
            results = resp.json().get("results", [])
            if results:
                context_lines = [r["text"] for r in results if r.get("text")]
                context = " / ".join(context_lines)
                return f"[Sacred Knowledge: {context}]\n\nUser asks: {user_text}"
        except httpx.TimeoutException:
            ten_env.log_warn("shrine_rag: knowledge search timed out, passing through")
        except Exception as exc:
            ten_env.log_warn(f"shrine_rag: knowledge search failed: {exc}")

        return user_text
