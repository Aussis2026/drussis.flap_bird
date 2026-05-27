console.log("Esta conectado")

const sprites = new Image();
sprites.src = "sprites.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

const Background = {
    Sx: 390,
    Sy: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    desenha() {
        contexto.fillStyle = "#70c5ce";
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            Background.Sx, Background.Sy, // Sprite X, Sprite Y
            Background.largura, Background.altura, // Tamanho do recorte na sprite
            Background.x, Background.y, // Posição X, Posição Y no canvas
            Background.largura, Background.altura // Tamanho do recorte no canvas
        );

        contexto.drawImage(
            sprites,
            Background.Sx, Background.Sy, // Sprite X, Sprite Y
            Background.largura, Background.altura, // Tamanho do recorte na sprite
            (Background.x + Background.largura), Background.y, // Posição X, Posição Y no canvas
            Background.largura, Background.altura // Tamanho do recorte no canvas
        );
    }

}


const Floor = {
    Sx: 0,
    Sy: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    desenha() {
        contexto.drawImage(
            sprites,
            Floor.Sx, Floor.Sy, // Sprite X, Sprite Y
            Floor.largura, Floor.altura, // Tamanho do recorte na sprite
            Floor.x, Floor.y, // Posição X, Posição Y no canvas
            Floor.largura, Floor.altura // Tamanho do recorte no canvas
        );
        contexto.drawImage(
            sprites,
            Floor.Sx, Floor.Sy, // Sprite X, Sprite Y
            Floor.largura, Floor.altura, // Tamanho do recorte na sprite
            (Floor.x + Floor.largura), Floor.y, // Posição X, Posição Y no canvas
            Floor.largura, Floor.altura // Tamanho do recorte no canvas
        );
    }
};

const flapBird = {
    Sx: 0,
    Sy: 0,
    largura: 33,
    altura: 24,
    x: 20,
    y: 50,
    pulo: 4.6,
    jump(){
        flapBird.speed = - flapBird.pulo;
    },
    speed: 0,
    gravity: 0.25,
    atualizar() {
        flapBird.speed = flapBird.speed + flapBird.gravity;
        flapBird.y = flapBird.y + flapBird.speed;
    },

    desenha() {
        contexto.drawImage(
            sprites,
            flapBird.Sx, flapBird.Sy, // Sprite X, Sprite Y
            flapBird.largura, flapBird.altura, // Tamanho do recorte na sprite
            flapBird.x, flapBird.y, // Posição X, Posição Y no canvas
            flapBird.largura, flapBird.altura // Tamanho do recorte no canvas
        );



    }
};

const mensagemGetReady = {
    Sx: 134,
    Sy: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.Sx, mensagemGetReady.Sy, // Sprite X, Sprite Y
            mensagemGetReady.largura, mensagemGetReady.altura, // Tamanho do recorte na sprite
            mensagemGetReady.x, mensagemGetReady.y, // Posição X, Posição Y no canvas
            mensagemGetReady.largura, mensagemGetReady.altura // Tamanho do recorte no canvas
        );
    }
};

let telaActive = {};
function changeScreen(newscreen) {
    telaActive = newscreen;
};

const Tela = {
    INICIO: {
        desenha() {
            Background.desenha();
            Floor.desenha();
            flapBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            changeScreen(Tela.JOGO);
        },
        atualizar() {
        }
    }
};
Tela.JOGO = {
    desenha() {
        Background.desenha();
        Floor.desenha();
        flapBird.desenha();
    },
    click() {
        flapBird.jump();
    },
    atualizar() {
        flapBird.atualizar();
    }
}
function loop() {
    telaActive.desenha();
    telaActive.atualizar();

    requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
    if (telaActive.click) {
        telaActive.click();
    }
});
changeScreen(Tela.INICIO);
loop();