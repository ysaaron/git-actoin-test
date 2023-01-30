#!/bin/bash
./config.sh --url "${GITHUB_REPOSITORY}" --token "${GITHUB_TOKEN}"
./run.sh
