FROM tenframework/ten-agent-dev:latest
WORKDIR /app
COPY . .
RUN pip install httpx
CMD ["tman", "start"]
