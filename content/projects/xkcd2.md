---
title: xkcd 2

---


{% extends 'custom/project_page.html' %}

{% block name %}xkcd 2{% endblock %}

{% block details %}
    {% filter markdown %}
        ## Overview

        xkcd 2 is a slightly different presentation of [xkcd][] comics. You can [read more about why I made it][2]
        and [check out the code on github][1].

        Licensed under the MIT license.

        [xkcd]: http://xkcd.com
        [1]: https://github.com/tylerbutler/xkcd2
        [2]: /2012/05/xkcd-2/

    {% endfilter %}
{% endblock %}
