---

title: The Zune and Wireless
date: '2006-12-20T02:20:00-08:00'
engineer:
  slug: the-zune-and-wireless
  url: /2006/12/the-zune-and-wireless/

# Custom Properties
guid: http://blog.tylerbutler.com/index.php/2006/12/the-zune-and-wireless/

---

A lot of people have made a big deal about the limitations of the [Zune][1]
wireless functionality since it was released a few weeks ago. While I totally
agree that there is a lot of untapped potential with the device currently,
there is at least one "obvious" omission that people have pointed out that
simply isn't a good idea, to be honest.

I'm talking about syncing to the device using the wireless. Sounds cool,
right? You just walk into your apartment, turn on the Zune, and Boom! All of
your music is synchronized to it. But what people don't seem to realize is how
slow this would be. The maximum bandwidth for USB 2.0 is [480 Mbit/s][2], or
60 MB/s. 802.11g, on the other hand, has a [maximum raw data rate of 54
Mbit/s][3], or about 24.7 Mbit/s net throughput. Now, by applying some simple
mathematics:

480 / 24.7 = 19.4332

This means that syncing to your device using wireless would be roughly 20
times slower than using USB 2.0. Even if we assume the theoretical max data
rate for 802.11g, which isn't realistic, to be clear, you're still looking at
a transfer speed that's ten times slower. And don't even think about using
802.11b. Frankly, this doesn't sound like a good idea.

"So what?" you say. "I can leave the Zune syncing all night and it'll be ready
to go in the morning. Speed isn't a real issue." OK, fine. You walk into your
apartment, you turn on your Zune, and it starts syncing. You go to bed. You
wake up the next morning, and your Zune is finished syncing, but it's battery
has also been drained. Good luck using it on your commute.

So what do you do next time? You plug it in so it can charge while it's
syncing. But at this point, why not just plug it directly into your computer
to sync and charge at the same time, at a much faster rate? So to me, it's
clear that isn't really a desirable feature, and I'll bet that some Program
Manager on the Zune team came to the same conclusion.

One thing that I will point out, however, is that many times, when you sync,
you're not syncing that much data. Your library hasn't changed that much, and
the only thing that's being synced is play counts or updated track info or
something. In that case, this feature might make sense. The amount of data
wouldn't be large, so the process wouldn't take long and the battery drain
would be minimal. There might be some scenarios where this feature would be
useful. However, I think that a lot of people had a knee-jerk reaction and
haven't really thought through the ramifications and technical limitations of
that feature. But hey, that's what we PM's get paid for, right?

   [1]: http://www.zune.net/
   [2]: http://en.wikipedia.org/wiki/USB_2.0#Transfer_speed
   [3]: http://en.wikipedia.org/wiki/802.11g#802.11g

