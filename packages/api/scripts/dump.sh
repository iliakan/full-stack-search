#!/bin/bash

mongodump --db fts --archive | zstd -6 > data/db.zstd
