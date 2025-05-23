# Build stage
FROM node:20.18-alpine

# Configurar timezone
ENV TZ=America/Sao_Paulo
RUN apk add --no-cache tzdata python3 make g++ vips-dev \
    && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
    && echo "America/Sao_Paulo" > /etc/timezone

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar código fonte e fazer build
COPY . .
RUN npm run build

# Expor porta do Vite preview
EXPOSE 4173

# Configurar variáveis de ambiente
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_CONTRACT_LINK=${VITE_API_CONTRACT_LINK}

# Iniciar em modo preview
CMD ["npm", "run", "preview", "--host"]