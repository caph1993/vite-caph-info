FROM python:3.12-alpine

RUN pip install requests

# copy listener script
WORKDIR /app
COPY webhook_listener.py .
COPY webhook_executor.py .

# create non-root user
RUN adduser -D webhook && chown -R webhook /app
USER webhook

# environment variable: must be passed at runtime
ENV WEBHOOK_SECRET=""
ENV REPO_OWNER=""
ENV REPO_NAME=""

# expose the internal port
EXPOSE 9000

# start the listener
CMD ["python3", "/app/webhook_listener.py"]