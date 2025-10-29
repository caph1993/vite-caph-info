FROM golang:1.22-alpine as builder

# Install git and build tools
RUN apk add --no-cache git build-base

WORKDIR /src

# Use `go install` so the built binary is placed in /go/bin (GOPATH)
# Pinning to @latest here; change to a specific tag if you want reproducible builds.
RUN GOBIN=/go/bin go install github.com/adnanh/webhook@latest

FROM alpine:latest

# runtime dependencies
RUN apk add --no-cache curl tar jq ca-certificates

# copy the binary produced by the builder
COPY --from=builder /go/bin/webhook /usr/local/bin/webhook
RUN chmod +x /usr/local/bin/webhook

WORKDIR /app

COPY hooks.yml /etc/webhook/hooks.yml
COPY download-latest.sh /app/download-latest.sh
RUN chmod +x /app/download-latest.sh

RUN adduser -D non-root && chown -R non-root /app && mkdir -p /app/releases
USER non-root

ENV REPO=""
ENV WEBHOOK_SECRET=""
ENV GITHUB_TOKEN=""

CMD [ "webhook", "-hooks", "/etc/webhook/hooks.yml", "-template", "-port", "9000", "-verbose" ]
