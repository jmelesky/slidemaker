#!/usr/bin/env python

import sys
import markdown2 as md
import re

with open('wrapper.html') as f:
    html_string = f.read()

with open('slides.txt') as f:
    slides_as_txt = f.read().split("---\n")

# grab the first line of the first slide to use as a title
title = slides_as_txt[0].split("\n")[0]

# strip stuff that might be markdown
title = re.sub(r'[^a-zA-Z0-9 .,!?]', r'', title)

slide_htmls = []
for x in slides_as_txt:
    slide_htmls += [ "<div class='slide'>",
                     md.markdown(x),
                     "</div>" ]

slide_html = "\n".join(slide_htmls)

html_string = re.sub(r'__TITLE__', title, html_string)
html_string = re.sub(r'__SLIDES__', slide_html, html_string)

with open('index.html', 'w') as f:
    f.write(html_string)


