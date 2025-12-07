FROM ollama/ollama:0.4.0

ENV OLLAMA_HOST=0.0.0.0
ENV OLLAMA_PORT=11434
ENV OLLAMA_MODELS=/models
ENV DEFAULT_MODEL=llama3.2

RUN mkdir -p /models

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 11434

CMD ["/usr/local/bin/entrypoint.sh"]

