# WebP to JPEG コンバーター

ブラウザ上で WebP 画像を JPEG 形式に変換できるウェブアプリケーションです。サーバーへのアップロードは必要なく、すべての処理はクライアントサイドで完結します。

このプロジェクトは[Create React App](https://github.com/facebook/create-react-app)を使用して構築されています。

## Firebase Hosting へのデプロイ運用手順

このプロジェクトをFirebase Hostingにデプロイする普段の流れは以下の通りです。

### 1. アプリケーションのビルド

```bash
npm run build
```

### 2. Firebase Hosting へデプロイ

```bash
firebase deploy
```

- デプロイが成功すると、コンソールにデプロイURLが表示されます。
- GitHub Actionsによる自動デプロイを設定済みの場合は、mainブランチにマージするだけで自動的に本番公開されます。

---

### 初回セットアップ・GitHub連携などの詳細手順は[Deploy.md](./Deploy.md)を参照してください。

---

カスタムドメインの設定やトラブルシューティングもDeploy.mdにまとめています。


## 詳細情報

Create React App の詳細については、[Create React App ドキュメント](https://facebook.github.io/create-react-app/docs/getting-started)を参照してください。

React について学ぶには、[React ドキュメント](https://reactjs.org/)を参照してください。

Firebase Hosting の詳細については、[Firebase Hosting ドキュメント](https://firebase.google.com/docs/hosting)を参照してください。
