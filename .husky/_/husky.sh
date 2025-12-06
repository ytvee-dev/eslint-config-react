#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  husky_skip_init=1

  if [ "$HUSKY" = "0" ]; then
    exit 0
  fi

  command -v sh >/dev/null 2>&1 || {
    echo "sh not found" >&2
    exit 1
  }

  if [ -f ~/.huskyrc ]; then
    . ~/.huskyrc
  fi
fi
