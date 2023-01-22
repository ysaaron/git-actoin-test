FROM ubuntu:focal as base

ARG GITHUB_RUNNER_VERSION="2.300.2"

WORKDIR /github

RUN apt-get update \
    && apt-get install -y \
        curl

RUN curl -o action.tar.gz -L "https://github.com/actions/runner/releases/download/v${GITHUB_RUNNER_VERSION}/actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz" && \
    tar -zxf action.tar.gz && \
    rm action.tar.gz && \
    ./bin/installdependencies.sh

FROM ubuntu:focal

ENV GITHUB_TOKEN ""
ENV GITHUB_REPOSITORY ""
ENV RUNNER_ALLOW_RUNASROOT "1"
ENV DEBIAN_FRONTEND noninteractive

WORKDIR /github
COPY --from=base /github .
COPY entrypoint.sh entrypoint.sh

RUN chmod +x entrypoint.sh \
    && apt-get update \
    && apt-get install -y \
        sudo \
        git \
        jq \
        docker \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && useradd -m github \
    && usermod -aG sudo github \
    && echo "%sudo ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

ENTRYPOINT ["./entrypoint.sh"]
