TASK DESCRIPTION IS BELOW
====================================================================

#Introduction#

This exercise tests your ability to distinguish the signal from the
noise. First, you will organize a random input into meaningful output.
Second, you'll report on that output using software.

#Prerequisites#

Your answer will be written in any language that you prefere, and must meet the
following requirements:

 * It must run on *nix OS, and shouldn't require
   any unusual binaries or new software to run.

 * Code should be covered by Unit/Integration tests

If you're a vagrant user, you can exactly replicate the box on which
we'll test your answer by using this [base
box](https://cloud-images.ubuntu.com/vagrant/precise/current/precise-server-cloudimg-amd64-vagrant-disk1.box).

#The Randomness Beacon#

The National Institute of Standards and Technology broadcasts a signed,
timestamped random bit sequence once a minute, every minute, and has
since Unix epoch time 1378395540 (09/05/2013 11:39 a.m.). It's called
the [_Randomness Beacon_](http://www.nist.gov/itl/csd/ct/nist_beacon.cfm), and you're
going to analyze it.

##Goal 1: Sampling Chaos##

The Randomness Beacon publishes a [RESTful
API](https://beacon.nist.gov/home), through which you can retrive any
given minute's beacon value as 128 hexidecimal characters, as well as a
variety of other authentication data. Your first goal is to summarize
the beacon's emissions over arbitrary amounts of time.

That program should have the following characteristics:

1. Without additional arguments, it should retrieve the most recent
   event from the randomness beacon, and count the number of characters
   in the OutputValue the beacon returns. It should then print that output
   to standard out in comma-delimited format.

   For example, if the randomness beacon returned the string "01AF04F" for
   its OutputValue, your application should print:

        0,2
        1,1
        4,1
        A,1
        F,2

   The first value of any given line is a character. The second value is
   the number of times that value occurred in the OutputValue string.

2. When given optional `--from` and `--to` arguments, the application should
   output the character count over a span of beacon values using
   *relative time*. For example, if we provided the application the following
   arguments:

        $ summarize-beacon --from "3 months 1 day 1 hour ago" --to "1 month 1 hour ago"

   the application should parse the strings "3 months 1 day 1 hour ago" and "1
   month 1 hour ago" into a time format the becaon's API can understand,
   and print the summed character count of all beacon values between those
   two times. The application should understand "month(s)," "day(s)", "hour(s)",
   and "minutes(s)", and should handle any combination of those values.

   Note that output is summed. For example, if the user enters `--from` and
   `--to` values that yield two beacon values, "B423AF" and "7352BA", the
   application should output the summed character counts of both values:

        2,2
        3,2
        4,1
        5,1
        7,1
        A,2
        B,2
        F,1

3. The application should error in a friendly way if a user enters a `--from`
   or `--to` time that predates the start of the beacon, Unix epoch time
   1378395540.

4. Application should have unit test coverage

*A Quick Note:* Don't feel obligated to solve this problem using just
the some standard library. Part of engineering is knowing when to
include 3rd party modules. In particular, if you know a good alternative
to standard libraries, feel free to include it.

#Submitting Answers#

Submit solutions to this problem via Github pull requests.
