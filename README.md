name: Gerar aplicativo Android (APK)

on:
  workflow_dispatch:

permissions:
  contents: write

jobs:
  apk:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v4
      - name: Localizar o projeto
        run: |
          CONFIG=$(find . -maxdepth 3 -name capacitor.config.ts -not -path '*/node_modules/*' | head -1)
          if [ -z "$CONFIG" ]; then echo "capacitor.config.ts não encontrado. Arquivos no repositório:"; ls -la; exit 1; fi
          DIR=$(dirname "$CONFIG")
          echo "PROJ=$DIR" >> "$GITHUB_ENV"
          echo "Projeto em: $DIR"; ls -la "$DIR"
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - uses: actions/setup-java@v5
        with:
          distribution: temurin
          java-version: 21
      - name: Aceitar licenças do Android SDK
        run: |
          echo "ANDROID_HOME=${ANDROID_HOME:-$ANDROID_SDK_ROOT}"
          SDKM="${ANDROID_HOME:-$ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager"
          if [ -x "$SDKM" ]; then yes | "$SDKM" --licenses > /dev/null 2>&1 || true; else echo "sdkmanager não encontrado; o Gradle tentará baixar o que faltar"; fi
      - name: Instalar dependências
        working-directory: ${{ env.PROJ }}
        run: |
          npm install --no-audit --no-fund --legacy-peer-deps
          npm install --no-audit --no-fund --legacy-peer-deps @capacitor/android@^8.5.1 @capacitor/cli@^8.5.1 @capgo/background-geolocation@^8.0.0
      - name: Gerar o app web
        working-directory: ${{ env.PROJ }}
        run: npm run build
      - name: Criar projeto Android
        working-directory: ${{ env.PROJ }}
        run: |
          [ -d android ] || npx cap add android
          node scripts/patch-android.mjs
          npx cap sync android
      - name: Compilar o APK
        working-directory: ${{ env.PROJ }}/android
        run: ./gradlew assembleDebug --no-daemon
      - name: Nomear o APK
        working-directory: ${{ env.PROJ }}
        run: cp android/app/build/outputs/apk/debug/app-debug.apk bros-rastreador.apk
      - name: Publicar o APK para baixar
        uses: softprops/action-gh-release@v2
        with:
          tag_name: app-${{ github.run_number }}
          name: Aplicativo Bros. (versão ${{ github.run_number }})
          body: Baixe o arquivo bros-rastreador.apk no celular Android e abra para instalar.
          files: ${{ env.PROJ }}/bros-rastreador.apk
