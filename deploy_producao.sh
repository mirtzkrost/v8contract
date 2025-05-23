#!/bin/bash

# Construir a imagem
echo "Construindo a imagem Docker..."
docker build -t mirtzkrost/v8contract:main .

# Push da imagem
echo "Fazendo push da imagem..."
docker push mirtzkrost/v8contract:main

# Remover stack existente
echo "Removendo stack existente..."
docker stack rm v8contract

# Aguardar alguns segundos
echo "Aguardando remoção da stack..."
sleep 10

# Deploy da nova stack
echo "Fazendo deploy da nova stack..."
docker stack deploy -c docker-compose.yaml v8contract

# Verificar status
echo "Verificando status do serviço..."
docker service ls | grep v8contract

docker build -t mirtzkrost/v8contract:main .

docker push mirtzkrost/v8contract:main