FROM debian:stable-slim as base

ARG GITHUB_RUNNER_VERSION="2.301.1"

WORKDIR /github

RUN apt-get update && \
    apt-get install -y curl && \
    curl -o action.tar.gz -L "https://github.com/actions/runner/releases/download/v${GITHUB_RUNNER_VERSION}/actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz" && \
    tar -zxf action.tar.gz && \
    rm action.tar.gz && \
    ./bin/installdependencies.sh

FROM debian:11

ENV GITHUB_TOKEN ""
ENV GITHUB_REPOSITORY ""
ENV RUNNER_ALLOW_RUNASROOT="1"

WORKDIR /github
COPY --from=base /github .
COPY entrypoint.sh entrypoint.sh

RUN chmod +x entrypoint.sh && \
    apt-get update && \
    apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | \
        tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update && \
    apt-get install -y \
        docker-ce \
        docker-ce-cli \
        containerd.io \
        docker-compose-plugin \
        yarn

ENTRYPOINT ["./entrypoint.sh"]
