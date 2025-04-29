# WebP to JPEG コンバーター

ブラウザ上で WebP 画像を JPEG 形式に変換できるウェブアプリケーションです。サーバーへのアップロードは必要なく、すべての処理はクライアントサイドで完結します。

このプロジェクトは[Create React App](https://github.com/facebook/create-react-app)を使用して構築されています。

## Firebase Hosting へのデプロイ手順

このアプリケーションを Firebase Hosting にデプロイする手順は以下の通りです。

### 1. Firebase CLI のインストール

まだ Firebase CLI がインストールされていない場合は、以下のコマンドを実行します：

```bash
npm install -g firebase-tools
```

### 2. Firebase へのログイン

以下のコマンドで Firebase アカウントにログインします：

```bash
firebase login
```

ブラウザが開き、Google アカウントでの認証が求められます。

**別のアカウントでログインしたい場合**

現在のアカウントからログアウトし、再度ログインすることでアカウントを切り替えることができます：

```bash
firebase logout
firebase login
```

これでログインするGoogleアカウントを選び直せます。

### 3. Firebase プロジェクトの初期化

プロジェクトディレクトリで以下のコマンドを実行します：

```bash
firebase init
```

以下のステップに従って設定を行います：

1. 矩印を改行してスペースキーを押し、アローキーで「Hosting: Configure files for Firebase Hosting」を選択し、スペースキーを押して選択、Enter キーを押します。
2. 既存の Firebase プロジェクトを使用するか、新しいプロジェクトを作成するか選択します。
3. 公開ディレクトリとして「build」を入力します（Create React App の生成物はビルド後にこのディレクトリに保存されます）。
4. シングルページアプリケーションとして設定するかどうかについては「yes」を選択します。
5. GitHub との統合は必要に応じて設定します。

### 4. アプリケーションのビルド

デプロイ前にアプリケーションをビルドします：

```bash
npm run build
```

これにより、最適化された静的ファイルが`build`ディレクトリに生成されます。

### 5. Firebase へのデプロイ

ビルドが完了したら、以下のコマンドでデプロイします：

```bash
firebase deploy
```

デプロイが成功すると、コンソールにデプロイされた URL が表示されます。この URL を使用して、アプリケーションにアクセスできます。

### 6. カスタムドメインの設定（オプション）

---

### GitHub統合（自動デプロイ）の後付け設定

Firebase HostingのGitHub Actionsによる自動デプロイを後から設定する場合は、以下のコマンドを実行してください。

```bash
firebase init hosting:github
```

このコマンドを実行すると、対話形式でリポジトリやブランチ、ビルドコマンドなどを設定できます。

**ヒント:**
- 途中でGitHubリポジトリへのアクセス認証が求められる場合があります。
- 既にGitHubリモートが設定されている（例: `git remote add origin ...`）必要があります。


カスタムドメインを設定する場合は、Firebase コンソールの「Hosting」セクションから設定できます。以下の手順で行います：

1. [Firebase コンソール](https://console.firebase.google.com/)にアクセスします。
2. プロジェクトを選択し、左側のメニューから「Hosting」を選択します。
3. 「カスタムドメイン」セクションで「カスタムドメインを追加」をクリックします。
4. ドメインを入力し、DNS レコードの設定手順に従って設定を完了させます。

## 詳細情報

Create React App の詳細については、[Create React App ドキュメント](https://facebook.github.io/create-react-app/docs/getting-started)を参照してください。

React について学ぶには、[React ドキュメント](https://reactjs.org/)を参照してください。

Firebase Hosting の詳細については、[Firebase Hosting ドキュメント](https://firebase.google.com/docs/hosting)を参照してください。
