# Contributing to Terminal Portfolio

Welcome to the Terminal Portfolio project! We appreciate your interest in contributing to our open-source project.

Please take a moment to review the following guidelines to ensure a smooth and positive contribution process.

First time contributor? Don't worry! We will help you throughout the process. Feel free to ask any questions you may have. We are here to help! :)

## Table of Contents

1. [Getting Started](#getting-started)
   - [Find an Issue](#find-an-issue)
   - [Fork the Repository](#fork-the-repository)
   - [Clone the Repository](#clone-the-repository)
   - [Set Up the Development Environment](#set-up-the-development-environment)
2. [Making Contributions](#making-contributions)
   - [Branching](#branching)
   - [Writing Code](#writing-code)
   - [Documentation](#documentation)
   - [Commit Messages](#commit-messages)
   - [Pushing Changes](#pushing-changes)
   - [Testing](#testing)
3. [Submitting Pull Requests](#submitting-pull-requests)
4. [Review Process](#review-process)
5. [Attribution](#attribution)

## Getting Started

### Find an Issue

- Go to [issues](https://github.com/thtauhid/terminal-portfolio/issues) and find an issue that you can solve.
- Comment on the issue that you want to solve it.

### Fork the Repository

Click the "Fork" button on the top right corner of this repository's page to create a copy of the project in your GitHub account. You'll be making your contributions in your forked repository.

### Clone the Repository

Clone your forked repository to your local machine using the following command:

```bash
git clone https://github.com/<your-username>/terminal-portfolio.git
```

### Set Up the Development Environment

Install the project's dependencies:

```bash
npm install
```

Run the project locally:

```bash
npm run dev
```

## Making Contributions

### Branching

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature-name
```

### Writing Code

Make your changes to the codebase. Please follow the coding conventions and standards used throughout the project.
Make sure to write meaningful comments in your code.

### Documentation

Update the documentation if your changes impact the project's user or developer documentation.

This includes updating README files, code comments, or any other relevant documentation.

### Commit Messages

Please follow conventional commit messages for your commits. This helps in generating meaningful changelogs automatically.

You can use the following command to commit your changes:

```bash
git commit -m "fixes: #0000"
```

### Pushing Changes

Before pushing your changes, make sure to pull the latest changes from the main repository's main branch:

```bash
git pull origin main
```

Push your changes to your forked repository:

```bash
git push origin feature-name
```

### Testing

We don't have any tests yet.
Please check your code manually before submitting a PR.

## Submitting Pull Requests

When you're ready to submit your changes, create a pull request (PR) from your feature branch to the main repository's main branch. Be sure to include a clear and descriptive title and a detailed description of your changes.

## Review Process

Once you've submitted a PR, maintainers and contributors will review your code, provide feedback, and request changes if necessary. Be prepared to address these comments and make necessary revisions.

## Attribution

Contributors will be credited for their contributions in the project's documentation. Thank you for your valuable contributions to Terminal Portfolio!

Note: This CONTRIBUTING.md file is a guideline. The project maintainers may have specific requirements or procedures that override these general instructions. Always refer to the project's own CONTRIBUTING.md if it exists.
