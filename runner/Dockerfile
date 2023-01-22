FROM ubuntu:focal

ARG GITHUB_RUNNER_VERSION="2.300.2"

ENV GITHUB_TOKEN ""
ENV GITHUB_REPOSITORY ""
ENV RUNNER_ALLOW_RUNASROOT "1"
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
    && apt-get install -y \
        curl \
        sudo \
        git \
        jq \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && useradd -m github \
    && usermod -aG sudo github \
    && echo "%sudo ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

WORKDIR /github
COPY entrypoint.sh entrypoint.sh

RUN chmod +x entrypoint.sh && \
    curl -o action.tar.gz -L "https://github.com/actions/runner/releases/download/v${GITHUB_RUNNER_VERSION}/actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz" && \
    tar -zxf action.tar.gz && \
    rm action.tar.gz && \
    ./bin/installdependencies.sh

ENTRYPOINT ["./entrypoint.sh"]
