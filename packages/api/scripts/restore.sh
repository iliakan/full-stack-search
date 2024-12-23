#!/bin/bash

zstd -d --stdout data/fts.zstd | mongorestore --drop --archive=-
