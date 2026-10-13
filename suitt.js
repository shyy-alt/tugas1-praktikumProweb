
let jenisAktif = "";
let skorElo = 0;
let skorGweh = 0;
let gameSelesai = false;

// Data game
const dataSuit = {
    batu: {
        nama: "Batu-Gunting-Kertas",
        pilihan: ["Batu", "Gunting", "Kertas"],
        emoji: ["🪨", "✂️", "📄"],
        menang: {
            Batu: "Gunting",
            Gunting: "Kertas",
            Kertas: "Batu"
        }
    },

    gajah: {
        nama: "Gajah-Orang-Semut",
        pilihan: ["Gajah", "Orang", "Semut"],
        emoji: ["🐘", "🧑", "🐜"],
        menang: {
            Gajah: "Orang",
            Orang: "Semut",
            Semut: "Gajah"
        }
    },

    jari: {
        nama: "Suit Jari",
        pilihan: ["Jempol", "Telunjuk", "Kelingking"],
        emoji: ["👍", "☝️", "🤙"],
        menang: {
            Jempol: "Telunjuk",
            Telunjuk: "Kelingking",
            Kelingking: "Jempol"
        }
    }
};

// Pesan hasil main
const pesanMenang = [
    "🏆 RISPEK, BISA JG TERNYATA",
    "🔥 LAH KOK JAGO??",
    "😎 HOKI LU BRAY"
];

const pesanKalah = [
    "💻 SKILL ISSUE, BESTIE!",
    "🤖 COBA LAGI, JANGAN NANGES!",
    "📉 ADUH, KOK CUPU?"
];

const pesanSeri = [
    "🗿 IMBANG, BOS!",
    "😭 KOK SAMAAN SIH?",
    "🤨 LAH SERI"
];

// Memilih Suit
function pilihSuit(jenis) {
    jenisAktif = jenis;
    skorElo = 0;
    skorGweh = 0;
    gameSelesai = false;

    document.getElementById("menuSuit").style.display = "none";
    document.getElementById("areaSuit").style.display = "block";
    document.getElementById("judulSuit").innerText =
        dataSuit[jenis].nama;

    let area = document.getElementById("pilihanPemain");
    area.innerHTML = "";

    let pilihan = dataSuit[jenis].pilihan;
    let emoji = dataSuit[jenis].emoji;

    for (let i = 0; i < pilihan.length; i++) {
        let tombol = document.createElement("button");

        tombol.innerText = emoji[i] + " " + pilihan[i];

        tombol.onclick = function() {
            mainSuit(pilihan[i]);
        };

        area.appendChild(tombol);
    }

    document.getElementById("pilihanElo").innerText =
        "Pilihan elo: -";
    document.getElementById("PilihanGweh").innerText =
        "Pilihan gweh: -";

    let hasil = document.getElementById("hasil");
    hasil.innerText = "Udah Siap Blom?";
    hasil.className = "";

    perbaruiSkor();
}

// memainkan suit
function mainSuit(pilihanElo) {
    if (gameSelesai) {
        return;
    }

    let game = dataSuit[jenisAktif];

    let acak = Math.floor(Math.random() * 3);
    let pilihanGweh = game.pilihan[acak];

    let hasil = document.getElementById("hasil");

    // Menentukan hasil suit
    if (pilihanElo === pilihanGweh) {
        hasil.innerText = pesanSeri[
            Math.floor(Math.random() * pesanSeri.length)
        ];
        hasil.className = "pesanSeri";

    } else if (game.menang[pilihanElo] === pilihanGweh) {
        skorElo++;

        hasil.innerText = pesanMenang[
            Math.floor(Math.random() * pesanMenang.length)
        ];
        hasil.className = "pesanMenang";

    } else {
        skorGweh++;

        hasil.innerText = pesanKalah[
            Math.floor(Math.random() * pesanKalah.length)
        ];
        hasil.className = "pesanKalah";
    }

    // Menampilkan pilihan elo dan gweh
    let emojiElo =
        game.emoji[game.pilihan.indexOf(pilihanElo)];

    let emojiGweh =
        game.emoji[game.pilihan.indexOf(pilihanGweh)];

    document.getElementById("pilihanElo").innerText =
        "Pilihan elo: " + emojiElo + " " + pilihanElo;

    document.getElementById("PilihanGweh").innerText =
        "Pilihan gweh: " + emojiGweh + " " + pilihanGweh;

    perbaruiSkor();

    // game berakhir jika skor mencapai 3
    if (skorElo === 3 || skorGweh === 3) {
        gameSelesai = true;

        if (skorElo === 3) {
            hasil.innerText = "🏆 ELO JUARA, GWEH MENYERAH!";
            hasil.className = "pesanMenang";
        } else {
            hasil.innerText = "💻 GAME OVER! GWEH MENANG!";
            hasil.className = "pesanKalah";
        }

        let tombol = document.querySelectorAll(
            "#pilihanPemain button"
        );

        for (let i = 0; i < tombol.length; i++) {
            tombol[i].disabled = true;
        }
    }
}

// perbarui skor
function perbaruiSkor() {
    document.getElementById("skorElo").innerText = skorElo;
    document.getElementById("skorGweh").innerText = skorGweh;
}

// ulang permainan
function ulangGame() {
    pilihSuit(jenisAktif);
}

// balik ke menu
function kembaliMenu() {
    document.getElementById("areaSuit").style.display = "none";
    document.getElementById("menuSuit").style.display = "block";
}
