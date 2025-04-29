# 初回セットアップ手順（Firebase Hosting + GitHub Actions）

この手順は、プロジェクト初期構築時や新しい環境で最初に一度だけ実行すればOKです。

---

## 1. Firebase CLI のインストール

```bash
npm install -g firebase-tools
```

## 2. Firebase へのログイン

```bash
firebase login
```

ブラウザが開き、Google アカウントでの認証が求められます。

**別のアカウントでログインしたい場合**

```bash
firebase logout
firebase login
```

これでログインするGoogleアカウントを選び直せます。

## 3. Firebase プロジェクトの初期化

```bash
firebase init
```

- Hosting: Configure files for Firebase Hosting を選択
- 既存プロジェクトを使う場合は「Use an existing project」
- 公開ディレクトリは `build`
- シングルページアプリは「yes」
- GitHub連携は後述

## 4. GitHubリポジトリの登録（未設定の場合）

```bash
git remote add origin git@github.com:ユーザー名/リポジトリ名.git
git push -u origin main
```

## 5. GitHub Actionsによる自動デプロイ設定（後からでもOK）

```bash
firebase init hosting:github
```

- 対話形式でリポジトリやブランチ、ビルドコマンド（例: `npm ci && npm run build`）を設定
- 「Set up the workflow to run a build script before every deploy?」→ `y` でOK
- 「Set up automatic deployment to your site's live channel when a PR is merged?」→ `y` でOK

---

## トラブルシューティング

- サービスアカウント関連のエラーが出る場合は、数分待ってから再実行してください。
- それでも解決しない場合は、Google Cloud Consoleでサービスアカウントを確認してください。

---

## 6. カスタムドメインの設定

1. [Firebaseコンソール](https://console.firebase.google.com/)にアクセスし、対象プロジェクトを選択します。
2. 左側メニューから「Hosting」を選択します。
3. 「カスタムドメイン」セクションで「カスタムドメインを追加」をクリックします。
4. 追加したい独自ドメイン（例: `www.example.com`）を入力します。
5. 指示に従い、ドメイン管理サービス（例: お名前.com、Google Domains、ムームードメイン等）でDNSレコード（TXTやAレコードなど）を設定します。
6. Firebase側で所有権の確認とSSL証明書の自動発行が行われます。
7. 数分～数十分でカスタムドメインでアクセスできるようになります。

**参考:**  
- [Firebase公式：カスタムドメインの追加](https://firebase.google.com/docs/hosting/custom-domain)

---

## 参考
- [Firebase Hosting ドキュメント](https://firebase.google.com/docs/hosting)
