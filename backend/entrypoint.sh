#!/bin/sh
python load_data.py
exec flask run --host=0.0.0.0 --port=5001