# Scroller bittrex websocket nodejs

Bittrex websocket scroller with docker container and Ansible script for deploy.
This scroller is developped with an nodejs application and a mysql container for
embeded the storage system. All script for manage platform or deploy are using
Ansible.

> Feel free to improve it or propose your ideas to improve it.

## summary:

- [Introduction](#introduction)
- [Install](#install)
- [Start](#start)
- [Utils](#utils)
- [Deploy on server](#deploy-on-server)
- [References](#references)


## Introduction

All of these requirements are needed for a local usage.

### Requirements:
- [Python3](https://www.python.org)
- [Docker](https://www.docker.com)
- [Docker-compose](https://docs.docker.com/compose/)
- [Docker network](https://docs.docker.com/network/)

for a server deployment you also need Ansible was installed and the remote hosts are
available to be managed by Ansible.
### Server Deployment Requirements:
- [Ansible](https://www.ansible.com)
- Remote available for ansible managing

> The server deployment install packages, a list of this package is available: [here](#ansible-install-packages)


## Install

First at all you must install the scroller configuration.
The scroller configuration is a list of cryptocurrency markets store in `config.yml`.

Generate the config file (use python3 script):
```shell
# with make
make install

# if you have any failed with make it's probably because of the python location,
# run the python script manually or make the python3 binary works with
# the command `python3 --version`

python3 config/set_markets_configuration/getMarket.py
```
If this command failed because of missing python3 yaml package install it and retry.

> The python script provide the Bittrex python api wrapper but feel free [to stars the repository](https://github.com/ericsomdahl/python-bittrex).

That will get all available market from Bittrex broker and set into `config.yml`,
You must now set which markets your scroller's will get.

open `config.yml`:
```yaml
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
Add these lines 'target_base_currency_market' at the top of your file,
target_base_currency_market will be use to chose which market ticker
will be insert into the database.

In the case above, I want my scroller target all market with base currency 'USDT'.

Create a docker network for your scroller:
```shell
docker network create websocket-scroller;

# verify with :

docker network ls;
```

## Start

For start the scroller you have to:
```shell
make

# or

make up
```

> take a look at the [Documentation section](#documentation)

## logs
you can verify your module is up with:
```shell
  make ps
```

for logs:
```shell
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
|    0.0.2    | Connect websocket client and store ticker in database |
|             |                                                       |
