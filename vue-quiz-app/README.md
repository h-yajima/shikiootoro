# Vue Quiz App

このプロジェクトは、画像付きの選択式クイズを実装したVue.jsアプリケーションです。クイズは事前に定義されたセットから動的に選ばれる10問で構成されており、3つの難易度に分類されています。

## プロジェクト構成

```
vue-quiz-app
├── public
│   └── index.html          # Vue.jsアプリケーションのメインHTMLファイル
├── src
│   ├── assets
│   │   └── images          # クイズの質問で使用される画像のディレクトリ
│   ├── components
│   │   ├── Quiz.vue        # クイズロジックを処理するコンポーネント
│   │   └── Question.vue    # 個々の質問を表示するコンポーネント
│   ├── data
│   │   └── questions.json  # クイズの質問を含むJSONファイル
│   ├── App.vue             # Vueアプリケーションのルートコンポーネント
│   ├── main.js             # Vueアプリケーションのエントリーポイント
│   └── router
│       └── index.js        # ナビゲーション用のVue Router設定
├── package.json            # npm設定ファイル
├── README.md               # プロジェクトのドキュメント
└── vue.config.js           # Vue CLIの設定オプション
```

## 特徴

- **動的な質問選択**: クイズは大きなプールからランダムに10問を選択します。
- **画像対応**: 各質問には画像を含めることができ、クイズ体験を向上させます。
- **難易度レベル**: 質問は3つの難易度に分類されており、さまざまな挑戦を提供します。
- **Vue.jsフレームワーク**: Vue.jsを使用して、リアクティブでモダンなユーザーインターフェイスを構築しています。

## セットアップ手順

1. リポジトリをクローンします:
   ```
   git clone <repository-url>
   cd vue-quiz-app
   ```

2. 依存関係をインストールします:
   ```
   npm install
   ```

3. アプリケーションを実行します:
   ```
   npm run serve
   ```

4. ブラウザを開き、`http://localhost:8080`にアクセスしてクイズを表示します。

## 使用方法

- 「Start Quiz」ボタンをクリックしてクイズを開始します。
- 各質問に対して4つの選択肢の中から1つを選択します。
- クイズ終了後、スコアと正解が表示されます。

## ライセンス

このプロジェクトはMITライセンスの下で提供されています。