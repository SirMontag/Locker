# &raquo;This project is unmaintained&laquo;

Singly has shifted development to [Hallway](https://github.com/Singly/hallway), a multi-tenant, hosted version of the Locker. If you are interested in continuing the project, get in touch with the [developers list](http://bit.ly/singly-dev-list).


Locker - the "me" platform [![Build Status](https://secure.travis-ci.org/LockerProject/Locker.png)](http://travis-ci.org/LockerProject/Locker)
======================

This is an open source project that helps me collect all of my personal data, from wherever it is, into one place, and then lets me do really awesome stuff with it.

[Background Video](http://www.youtube.com/watch?v=pTNO5npNq28)

STATUS: Inactive.

We also have a [mailing list](http://bit.ly/singly-dev-list) setup.  Join and say hello!


## Getting Started

### The Fast Way

Lockerbox (by [pib](https://www.github.com/pib)) is a straightforward way to get all the high-level dependencies installed at once. It will make a single directory called lockerbox and get everything set up inside of there.

    curl https://raw.github.com/LockerProject/lockerbox/master/lockerbox.sh > lockerbox.sh
    chmod 0755 lockerbox.sh
    ./lockerbox.sh

When that successfully completes, add lockerbox/local/bin to your path:

    echo 'export PATH=$PATH:'`pwd`/lockerbox/local/bin >> ~/.profile
    source ~/.profile

Then:
    
    cd lockerbox/Locker
    make
    ./locker

now open [http://localhost:8042/](http://localhost:8042/) in your browser!

### The Detailed Way

If you encounter errors in "the fast way", or if you want to go through the process of setting everything up manually, check out the [detailed set up instructions](https://github.com/LockerProject/Locker/wiki/Detailed-Set-Up-Instructions).


## What are these things? ##

* **Connectors** - A service that knows how to connect to and sync data with a place where I have data about myself, such as an account on a site or service, or in some desktop app, on my phone, or even from a device.
* **Collections** - My data from the many different sources gets organized into common collections, such as places, contacts, messages, statuses, links, etc.
* **Apps** - Once my data is in my locker I need apps that do useful or fun things for me, with the ability to control where my data goes and not have to give up access to my online accounts.

Once I "install" them in my locker (giving them some working space, a local port, and some config), I can browse to them where they provide their own instructions/steps (for now, it's early yet and pretty manual).  To learn a bit more about the innards, I can install and run the Dev Docs app. :)

We need *TONS* of help and it's welcomed across the board, particularly in adding and advancing more of the connectors, just don a hard-hat and dig in, all patches welcomed, personal data FTW!

**I am the platform.**
