# SkillSync AI - Global Solution 2025 (Front-End)

## 🚀 Resumo do Projeto

Este projeto é a entrega da Global Solution de Front-End Design & Web Development do 2º Semestre.

O tema proposto, "O Futuro do Trabalho", foi interpretado através da criação do **SkillSync AI**, uma plataforma web focada em conectar profissionais, incentivar o desenvolvimento de competências e facilitar a transição de carreira (reskilling/upskilling).

Esta aplicação é uma Single Page Application (SPA) construída com **React** e estilizada com **Tailwind CSS**. Ela simula uma rede profissional (similar ao LinkedIn) onde é possível explorar um "Pool de Talentos", filtrar por habilidades e visualizar perfis detalhados em uma modal interativa.

## 👥 Integrantes do Grupo

* **Lucas Cavalcante** - RM 562857
* **Matheus Rodrigues** - RM 561689

## ✨ Features Implementadas

* **Listagem de Perfis:** Perfis carregados dinamicamente de um arquivo `perfis.json` local.
* **Cards de Perfil:** Apresentação limpa com nome, foto, cargo e principais *skills*.
* **Modal Interativa:** Ao clicar em um card, uma modal exibe dados detalhados do profissional, organizada por abas (Visão Geral, Habilidades, Experiência, etc.).
* **Recomendar Perfis:** Botão de "Recomendar" dentro da modal com feedback visual (`alert`).
* **Sistema de Filtros:** Filtros funcionais para busca por texto (nome/cargo), Área e Localização.
* **Filtros Dinâmicos:** As opções de filtro de "Área" e "Localização" são geradas automaticamente a partir dos dados do JSON, sem valores duplicados.
* **Design Responsivo:** A aplicação se adapta a diferentes tamanhos de tela (mobile, tablet, desktop) usando Tailwind CSS.
* **Dark Mode:** Um seletor de tema (Light/Dark) funcional e persistente (salva no `localStorage`), implementado inteiramente com lógica de estado do React, sem o uso da variante `dark:` do Tailwind.

## 🛠️ Instalação e Execução do Projeto

Para rodar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Luqetaa/skill-sync-app.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd nome-da-pasta-do-projeto
    ```

3.  **Instale as dependências:**
    (É necessário ter o Node.js instalado)
    ```bash
    npm install
    ```
    *Este comando instalará o React, `react-icons` e outras dependências necessárias.*

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Abra no navegador:**
    Acesse `http://localhost:5173` (ou a porta indicada no seu terminal) para visualizar a aplicação.

## 🌐 Links do Projeto

* **Link do Repositório:** `https://github.com/Luqetaa/skill-sync-app`
* **Link do Deploy (Vercel/Netlify):** `https://skill-sync-app-black.vercel.app/`
