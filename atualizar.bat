@echo off
chcp 65001 >nul
title Atualizar Curriculo no GitHub
cd /d "%~dp0"

echo ============================================
echo   ATUALIZANDO SEU CURRICULO NO GITHUB
echo ============================================
echo.

git diff --quiet && git diff --cached --quiet
if %errorlevel%==0 (
    echo Nao ha alteracoes novas para enviar.
    echo Seu curriculo ja esta atualizado no GitHub.
    echo.
    pause
    exit /b 0
)

echo Alteracoes encontradas. Digite uma breve descricao do que mudou.
echo (Se deixar em branco, sera usada a data e hora atual)
echo.
set "descricao="
set /p "descricao=Descricao: "

if "%descricao%"=="" set "descricao=Atualizacao do curriculo em %date% %time%"

echo.
echo Enviando para o GitHub...
echo.

git add .
git commit -m "%descricao%"
git push

echo.
if %errorlevel%==0 (
    echo ============================================
    echo   PRONTO! Curriculo atualizado com sucesso.
    echo   O site publicado atualiza em 1-2 minutos.
    echo ============================================
) else (
    echo ============================================
    echo   Ocorreu um erro ao enviar. Verifique sua
    echo   conexao e o login do Git, e tente de novo.
    echo ============================================
)

echo.
pause
