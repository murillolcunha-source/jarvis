# 🎩 JARVIS - AI Music Assistant

Bem-vindo ao **Jarvis**, um assistente de IA avançado que toca música como o famoso assistente do Iron Man (Marvel Universe).

## ✨ Recursos

- 🎵 **Reprodução de Música** - Controle completo de playback
- 🎤 **Reconhecimento de Voz** - Comandos por voz em português
- 💬 **Chat Interativo** - Conversa com o Jarvis
- 📊 **Visualizador de Áudio** - Animação sincronizada com música
- 🎚️ **Controle de Volume** - Ajuste dinâmico
- 📋 **Fila de Reprodução** - Gerencie suas músicas

## 🚀 Como Usar

### Instalação

```bash
# Clone o repositório
git clone https://github.com/murillolcunha-source/jarvis.git
cd jarvis

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

O servidor estará disponível em `http://localhost:3000`

### Comandos de Voz

- **"Play [música]"** - Toca uma música
- **"Pause"** - Pausa a reprodução
- **"Stop"** - Para a música
- **"Next"** - Próxima faixa
- **"Previous"** - Faixa anterior
- **"Volume [número]"** - Ajusta o volume (0-100)

### Controles de Teclado e Mouse

| Botão | Ação |
|-------|------|
| ▶ | Play/Pause |
| ⏮ | Faixa Anterior |
| ⏭ | Próxima Faixa |
| ⏹ | Stop |
| 🎤 | Ativar Microfone |

## 📁 Estrutura do Projeto

```
jarvis/
├── src/
│   ├── index.js              # Servidor Express principal
│   ├── core/
│   │   └── assistant.js      # Lógica do assistente
│   └── music/
│       └── player.js         # Controle de reprodução
├── public/
│   ├── index.html            # Interface web
│   ├── styles.css            # Estilos (tema escuro)
│   └── js/
│       ├── main.js           # Lógica da UI
│       ├── voice.js          # Reconhecimento de voz
│       └── player.js         # Visualizador de áudio
├── package.json              # Dependências
└── README.md                 # Este arquivo
```

## 🛠️ Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilos (Grid, Flexbox, Animações)
- **JavaScript (ES6+)** - Lógica
- **Web Speech API** - Reconhecimento de voz
- **Web Audio API** - Processamento de áudio
- **Canvas** - Visualizador de áudio

## 🎨 Design

O Jarvis apresenta um design moderno inspirado em interfaces de ficção científica:

- **Tema Escuro** - Confortável para os olhos
- **Cores Neon** - Destaque em azul ciano (#00d4ff)
- **Animações Suaves** - Transições elegantes
- **Responsivo** - Funciona em desktop e mobile

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
NODE_ENV=development
```

## 📝 Scripts Disponíveis

```bash
npm start          # Inicia o servidor
npm run dev        # Inicia com nodemon (modo desenvolvimento)
```

## 🎯 Funcionalidades Futuras

- [ ] Integração com Spotify API
- [ ] Integração com YouTube Music
- [ ] Banco de dados para playlists
- [ ] Autenticação de usuários
- [ ] Sincronização em múltiplos dispositivos
- [ ] Suporte para mais idiomas
- [ ] IA conversacional avançada (OpenAI API)
- [ ] Publicar na web (Vercel/Heroku)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:
1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

**Murillo Cunha**
- GitHub: [@murillolcunha-source](https://github.com/murillolcunha-source)

## 🙋 Suporte

Se você tiver dúvidas ou problemas, abra uma [issue](https://github.com/murillolcunha-source/jarvis/issues) no GitHub.

---

<div align="center">

**🎩 Good morning. I am Jarvis. How may I assist you?**

</div>
