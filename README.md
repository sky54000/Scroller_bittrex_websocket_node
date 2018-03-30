# Scroller_bittrex_websocket_node
Usefull scroller for Bittrex platform using websocket with lots of use cases.

To be able to start the scroller you need to do:

```
npm install dict --save
npm install --save node-cron
npm install
```

# Scroller Ticker Bot

### summary:

## Introduction


### Requirements:
- [Docker](https://www.docker.com)
- [Docker-compose](https://docs.docker.com/compose/)
or
- [Ansible]()
## Install

## Start


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

| **commands name** | **description**        |
|:-----------------:|:---------------------- |
|      `make`       | 1. down each service   |
|                   | 2. build basic project |
|                   | 3. run project         |
|                   |                        |
|  `make build_up`  | 1. build basic project |
|                   | 2. run project         |
|                   |                        |
|   `make build`    | build basic project.   |
|                   |                        |
|     `make up`     | run project            |
|                   |                        |
|    `make down`    | down project           |
|                   |                        |
|     `make ps`     | list container         |
|                   |                        |
|    `make logs`    | display all logs       |

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
