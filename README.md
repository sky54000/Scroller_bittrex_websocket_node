# Scroller_bittrex_websocket_node
Usefull scroller for Bittrex platform using websocket with lots of use cases.

To be able to start the scroller you need to do:

```
npm install dict --save
npm install --save node-cron
npm install node-yaml-config
npm install
```

# Scroller Ticker Bot

### summary:

## Introduction


### Requirements:
- [Python3](https://www.python.org)
- [Docker](https://www.docker.com)
- [Docker-compose](https://docs.docker.com/compose/)
- [Docker network](https://docs.docker.com/network/)
or
- [Ansible]()
## Install

First at all you must install the scroller configuration.
so let's run:
```
# with make
make install

# if you have any failed with make it's probably because of the python location,
# run the python script manually or make the python3 binary works with
# the command `python3 --version`

python3 install/set_markets_configuration/getMarket.py
```

That will get all available market from bittrex broker and set into config.yml,
You must now set what markets your scroller's will store data.

open `config.yml`:
```
target_base_currency_market:
  - USDT
baseCurrency:
- BTC
- USDT
- ETH
BTC:
- BTC-LTC
- BTC-DOGE
- BTC-VTC
...
```
Add these lines ('target_base_currency_market')at the top of your file,
you can specify the baseCurency on the list

In this case I want my scroller target all market with base currency 'USDT'.

Create a docker network for your scroller:
```
docker network create websocket-scroller;

# verify with :

docker network ls;
```
## Start

For start the scroller you have to:
```
make

or

make up
```

> take a look at the [Documentation section](#documentation)

## logs
you can verify your module is up with:
```
  make ps
```

for logs:
```
  # all logs
  make logs
```

## Documentation

_Makefile commands available_:

| **commands name** | **description**              |
|:-----------------:|:---------------------------- |
|      `make`       | 1. down each service         |
|                   | 2. build basic project       |
|                   | 3. run project               |
|                   |                              |
|  `make build_up`  | 1. build basic project       |
|                   | 2. run project               |
|                   |                              |
|   `make build`    | build basic project.         |
|                   |                              |
|     `make up`     | run project                  |
|                   |                              |
|    `make down`    | down project                 |
|                   |                              |
|     `make ps`     | list container               |
|                   |                              |
|   `make dumps`    | make a sql dumps of tickers. |
|                   |                              |
|    `make logs`    | display all logs             |

_Tricks_:

|              **commands**              | **description**         |
|:--------------------------------------:|:----------------------- |
| `docker network create "Network-Name"` | Create a docker network |
|          `docker network ls`           | List docker network     |

_Troubles possible_:

make logs failed:
if the commands failed use the docker-compose command:
`docker-compose logs`

## Reference


> - [Mysql compose hub](https://hub.docker.com/_/mysql/)
> - [Mysql documentation](https://dev.mysql.com/doc/)
> - [Docker website](https://www.docker.com)
> - [Docker-compose documentation](https://docs.docker.com/compose/)
> - [Git documentation](https://git-scm.com/documentation)
> - [Docker network documentation](https://docs.docker.com/engine/userguide/networking/work-with-networks/)


## version

| **Version** | **Description**                                       |
|:-----------:|:----------------------------------------------------- |
|    0.0.1    | Connect websocket client and display ticker (handler) |
|             |                                                       |
