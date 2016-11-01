# THE STORY THUS FAR...
This is, without a doubt, a work in progress. I've been learning React as I go, and there are still sizeable 
gaps in my understanding.

What you have here is a server that saves to the user's session (in-process only -- better to spend time on a
persistent solution, *n'est-ce pas?*). There is no client-side code that exercises the save yet. I have,
however, got some test coverage for the storage model.

The client side demonstrates some of the presentation semantics, both read-write and read-only, but no real
CRUD with the server yet. Also, I could well have done with `fetch()`, but jQuery was handy, so I went with
it. No tests yet, I've been trying to get basic happy-path functionality going.

I will continue on this as time permits.