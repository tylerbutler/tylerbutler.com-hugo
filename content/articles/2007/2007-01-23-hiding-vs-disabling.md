---

title: Hiding vs. Disabling
date: '2007-01-23T07:49:00-08:00'
slug: hiding-vs-disabling
tags:
- design
- sharepoint
engineer:
  slug: hiding-vs-disabling
  url: /2007/01/hiding-vs-disabling/

# Custom Properties
guid: http://blog.tylerbutler.com/index.php/2007/01/hiding-vs-disabling/

---

Someone came by my office today and asked me if I could show him how to make a
column on a SharePoint list required. No problem! While this isn't as simple
as it could be, it's pretty straightforward. Go into the list you want to
change, select **List Settings** from the **Settings** drop down, then click
the column you want to change in the **List Settings** page. You should see an
option called "Require that this column contains information." By default,
this is off, but turning it on will make the column required.

However, in this case, that option wasn't showing in the UI. The reason was
that the column was a **Yes/No (check box)** field. Now, if you think about
it, this makes sense. A checkbox _always_ has state, either checked or
unchecked, so it's by nature required. A user always has to fill in a checkbox
with some data, either by checking it or unchecking it. It all comes down to
the default state, which _is_ settable in the SharePoint UI.

The interesting thing here, though, is that the user didn't stop to think
about this. And that makes sense. He just wanted to make a column required; he
didn't think about what type of column it was. SharePoint totally removes the
required field setting from the UI for Yes/No fields because it doesn't make
sense. However, the user got confused. He wasn't sure if the UI was missing by
design or if he wasn't looking in the right spot for the setting. If you have
a task to accomplish using relatively unfamiliar UI, you go to the place that
makes sense to you, but you're never sure you're in the right place. In this
case, the user poked around other parts of the UI before coming to me, because
he thought he was looking in the wrong place.

This might be alleviated by disabling (i.e. graying out) the part of the UI
that is not applicable. This is somewhat clearer, because it says, "Yes, this
is where you would change this setting, but it doesn't make sense here or is
not allowed." This isn't a hard rule. You can't _always_ display _all_
possible settings in one piece of UI because if there are a large number of
settings, things can get confusing and distracting. Some hiding does make
sense in many cases. But it is worth some dedicated thought about your UI and
what your users are trying to accomplish when deciding whether to hide a piece
of UI or simply gray it out.

