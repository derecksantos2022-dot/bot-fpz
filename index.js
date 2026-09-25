const {
    Client,
    GatewayIntentBits,
    ChannelType,
    PermissionsBitField,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("./config.json");

// ==================================================
// REAL FPZ BOT
// ==================================================

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ==================================================
// IMAGEM DO PAINEL REAL FPZ
// ==================================================

const IMAGEM_REAL_FPZ =
    "https://i.ibb.co/WpKGcp13/real-fpz-bot.png";

// ==================================================
// VERIFICAR CARGO AUTORIZADO PARA ACEITAR/RECUSAR
// ==================================================

function podeDecidir(interaction) {

    // Administrador também pode decidir
    if (
        interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator
        )
    ) {
        return true;
    }

    // Verifica os cargos específicos
    if (
        !Array.isArray(config.cargosYoutuber)
    ) {
        return false;
    }

    return config.cargosYoutuber.some(
        cargoID =>
            interaction.member.roles.cache.has(cargoID)
    );
}

// ==================================================
// PAINEL
// ==================================================

function criarPainel() {

    const embed = new EmbedBuilder()

        .setColor("#0066FF")

        .setImage(IMAGEM_REAL_FPZ)

        .setTitle(
            "👑 𝙍𝙀𝘼𝙇 𝙁𝙋𝙕 | 𝙔𝙊𝙐𝙏𝙐𝘽𝙀𝙍"
        )

        .setDescription(

            "━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +

            "🎥 𝙎𝙀𝙅𝘼 𝙔𝙊𝙐𝙏𝙐𝘽𝙀𝙍 𝘿𝘼 𝙍𝙀𝘼𝙇 𝙁𝙋𝙕\n\n" +

            "━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +

            "𝙌𝙐𝙀𝙍 𝙁𝘼𝙕𝙀𝙍 𝙋𝘼𝙍𝙏𝙀 𝘿𝘼 𝙍𝙀𝘼𝙇 𝙁𝙋𝙕 𝘾𝙊𝙈𝙊 𝙔𝙊𝙐𝙏𝙐𝘽𝙀𝙍?\n\n" +

            "📋 𝙍𝙀𝙌𝙐𝙄𝙎𝙄𝙏𝙊𝙎 𝙊𝘽𝙍𝙄𝙂𝘼𝙏𝙊́𝙍𝙄𝙊𝙎\n\n" +

            "🎯 𝟱𝟬 𝙄𝙉𝙎𝘾𝙍𝙄𝙏𝙊𝙎 𝙊𝙐 𝙈𝘼𝙄𝙎\n\n" +

            "🎥 𝙋𝙀𝙇𝙊 𝙈𝙀𝙉𝙊𝙎 𝟱 𝘾𝙊𝙉𝙏𝙀𝙐́𝘿𝙊𝙎 𝙋𝙐́𝘽𝙇𝙄𝘾𝙊𝙎 𝘿𝙀 𝙎𝘼𝙈𝙋\n\n" +

            "🔗 𝘾𝘼𝙉𝘼𝙇 𝙑𝙄𝙉𝘾𝙐𝙇𝘼𝘿𝙊 𝘼𝙊 𝘿𝙄𝙎𝘾𝙊𝙍𝘿\n\n" +

            "📢 𝘿𝙄𝙑𝙐𝙇𝙂𝘼𝙍 𝙊 𝙎𝙀𝙍𝙑𝙄𝘿𝙊𝙍 𝙉𝘼 𝘿𝙀𝙎𝘾𝙍𝙄𝘾̧𝘼̃𝙊 𝙊𝙐 𝙋𝘼𝙄𝙉𝙀𝙇 𝘿𝙊 𝘾𝘼𝙉𝘼𝙇\n\n" +

            "🌐 𝘿𝙄𝙑𝙐𝙇𝙂𝘼𝙍: .gg/REALFPZ\n\n" +

            "━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +

            "🎥 𝘾𝙇𝙄𝙌𝙐𝙀 𝙉𝙊 𝘽𝙊𝙏𝘼̃𝙊 𝘼𝘽𝘼𝙄𝙓𝙊 𝙋𝘼𝙍𝘼 𝘼𝘽𝙍𝙄𝙍 𝙎𝙐𝘼 𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝘾̧𝘼̃𝙊.\n\n" +

            "━━━━━━━━━━━━━━━━━━━━━━━━━━"

        )

        .setFooter({
            text: "𝙍𝙀𝘼𝙇 𝙁𝙋𝙕 • 𝙀𝙦𝙪𝙞𝙥𝙚 𝙙𝙚 𝙑𝙚𝙧𝙞𝙛𝙞𝙘𝙖𝙘̧𝙖̃𝙤"
        });

    const botao = new ButtonBuilder()

        .setCustomId("verificacao_youtuber")

        .setLabel(
            "𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝘾̧𝘼̃𝙊 𝙔𝙊𝙐𝙏𝙐𝘽𝙀𝙍"
        )

        .setEmoji("🎥")

        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
        .addComponents(botao);

    return {
        embeds: [embed],
        components: [row]
    };
}

// ==================================================
// BOT ONLINE
// ==================================================

client.once("ready", async () => {

    console.log("======================================");
    console.log("       REAL FPZ BOT ONLINE");
    console.log("======================================");
    console.log(`Bot: ${client.user.tag}`);
    console.log(`ID: ${client.user.id}`);
    console.log("======================================");

    client.user.setPresence({
        activities: [
            {
                name: "REAL FPZ",
                type: 0
            }
        ],
        status: "online"
    });

    try {

        const canal = await client.channels.fetch(
            config.canalPainel
        );

        if (!canal) {

            console.log(
                "❌ Canal do painel não encontrado."
            );

            return;
        }

        console.log(
            `✅ Canal encontrado: ${canal.name}`
        );

        const mensagens = await canal.messages.fetch({
            limit: 50
        });

        const painelExistente = mensagens.find(
            msg =>
                msg.author.id === client.user.id &&
                msg.embeds.length > 0 &&
                msg.embeds[0].title ===
                "👑 𝙍𝙀𝘼𝙇 𝙁𝙋𝙕 | 𝙔𝙊𝙐𝙏𝙐𝘽𝙀𝙍"
        );

        if (painelExistente) {

            console.log("✅ Painel já existe.");
            console.log(
                "🔄 Atualizando painel..."
            );

            try {

                await painelExistente.edit(
                    criarPainel()
                );

                console.log(
                    "✅ Painel atualizado com sucesso."
                );

                if (!painelExistente.pinned) {

                    await painelExistente.pin();

                    console.log(
                        "📌 Painel fixado."
                    );
                }

            } catch (erro) {

                console.log(
                    "⚠️ Não foi possível atualizar o painel."
                );

                console.log(erro);
            }

        } else {

            const mensagem = await canal.send(
                criarPainel()
            );

            console.log(
                "✅ Painel enviado com sucesso."
            );

            try {

                await mensagem.pin();

                console.log(
                    "📌 Painel fixado."
                );

            } catch {

                console.log(
                    "⚠️ Não foi possível fixar o painel."
                );
            }
        }

    } catch (erro) {

        console.log(
            "❌ ERRO AO CARREGAR O PAINEL:"
        );

        console.log(erro);
    }
});

// ==================================================
// BOTÕES
// ==================================================

client.on(
    "interactionCreate",
    async interaction => {

        if (!interaction.isButton()) {
            return;
        }

        // ==================================================
        // ABRIR TICKET
        // ==================================================

        if (
            interaction.customId ===
            "verificacao_youtuber"
        ) {

            try {

                await interaction.deferReply({
                    ephemeral: true
                });

                const guild =
                    interaction.guild;

                const membro =
                    interaction.member;

                if (!guild) {

                    return interaction.editReply({

                        content:
                            "❌ 𝙀𝙨𝙩𝙚 𝙗𝙤𝙩𝙖̃𝙤 𝙨𝙤́ 𝙥𝙤𝙙𝙚 𝙨𝙚𝙧 𝙪𝙨𝙖𝙙𝙤 𝙙𝙚𝙣𝙩𝙧𝙤 𝙙𝙚 𝙪𝙢 𝙨𝙚𝙧𝙫𝙞𝙙𝙤𝙧."
                    });
                }

                // ==================================================
                // VERIFICAR TICKET
                // ==================================================

                const ticketExistente =
                    guild.channels.cache.find(
                        canal =>
                            canal.name ===
                            `youtube-${membro.id}`
                    );

                if (ticketExistente) {

                    return interaction.editReply({

                        content:
                            `❌ 𝙑𝙤𝙘𝙚̂ 𝙟𝙖́ 𝙥𝙤𝙨𝙨𝙪𝙞 𝙪𝙢 𝙩𝙞𝙘𝙠𝙚𝙩 𝙖𝙗𝙚𝙧𝙩𝙤.\n\n` +
                            `🎫 **𝙏𝙞𝙘𝙠𝙚𝙩:** ${ticketExistente}`
                    });
                }

                // ==================================================
                // CATEGORIA
                // ==================================================

                const categoria =
                    await guild.channels.fetch(
                        config.categoriaTickets
                    );

                if (!categoria) {

                    return interaction.editReply({

                        content:
                            "❌ 𝘼 𝙘𝙖𝙩𝙚𝙜𝙤𝙧𝙞𝙖 𝙙𝙚 𝙩𝙞𝙘𝙠𝙚𝙩𝙨 𝙣𝙖̃𝙤 𝙛𝙤𝙞 𝙚𝙣𝙘𝙤𝙣𝙩𝙧𝙖𝙙𝙖."
                    });
                }

                // ==================================================
                // PERMISSÕES
                // ==================================================

                const permissoes = [

                    {
                        id:
                            guild.roles.everyone.id,

                        deny: [
                            PermissionsBitField.Flags.ViewChannel
                        ]
                    },

                    {
                        id:
                            membro.id,

                        allow: [

                            PermissionsBitField.Flags.ViewChannel,

                            PermissionsBitField.Flags.SendMessages,

                            PermissionsBitField.Flags.ReadMessageHistory,

                            PermissionsBitField.Flags.AttachFiles
                        ]
                    }
                ];

                // ==================================================
                // CARGO EQUIPE
                // ==================================================

                if (config.cargoEquipe) {

                    try {

                        const cargoEquipe =
                            await guild.roles.fetch(
                                config.cargoEquipe
                            );

                        if (cargoEquipe) {

                            permissoes.push({

                                id:
                                    cargoEquipe.id,

                                allow: [

                                    PermissionsBitField.Flags.ViewChannel,

                                    PermissionsBitField.Flags.SendMessages,

                                    PermissionsBitField.Flags.ReadMessageHistory,

                                    PermissionsBitField.Flags.AttachFiles
                                ]
                            });
                        }

                    } catch {

                        console.log(
                            "⚠️ 𝘾𝙖𝙧𝙜𝙤 𝙙𝙖 𝙚𝙦𝙪𝙞𝙥𝙚 𝙣𝙖̃𝙤 𝙚𝙣𝙘𝙤𝙣𝙩𝙧𝙖𝙙𝙤."
                        );
                    }
                }

                // ==================================================
                // CRIAR TICKET
                // ==================================================

                const ticket =
                    await guild.channels.create({

                        name:
                            `youtube-${membro.id}`,

                        type:
                            ChannelType.GuildText,

                        parent:
                            categoria.id,

                        permissionOverwrites:
                            permissoes
                    });

                console.log(
                    `🎫 Ticket criado: ${ticket.name}`
                );

                // ==================================================
                // EMBED DO TICKET
                // ==================================================

                const embedTicket =
                    new EmbedBuilder()

                        .setColor("#0066FF")

                        .setTitle(
                            "👑 𝙍𝙀𝘼𝙇 𝙁𝙋𝙕 | 𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝘾̧𝘼̃𝙊"
                        )

                        .setDescription(

                            "🎥 **𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝘾̧𝘼̃𝙊 𝘿𝙀 𝙔𝙊𝙐𝙏𝙐𝘽𝙀𝙍**\n\n" +

                            `𝙊𝙡𝙖́, ${membro}!\n\n` +

                            "📋 **𝙀𝙉𝙑𝙄𝙀 𝙊𝙎 𝘿𝘼𝘿𝙊𝙎 𝘼𝘽𝘼𝙄𝙓𝙊:**\n\n" +

                            "🎯 **𝙎𝙐𝘼𝙎 𝙄𝙉𝙎𝘾𝙍𝙄𝙏𝙊𝙎:**\n" +

                            "𝙄𝙣𝙛𝙤𝙧𝙢𝙚 𝙖 𝙦𝙪𝙖𝙣𝙩𝙞𝙙𝙖𝙙𝙚 𝙙𝙚 𝙞𝙣𝙨𝙘𝙧𝙞𝙩𝙤𝙨 𝙙𝙤 𝙨𝙚𝙪 𝙘𝙖𝙣𝙖𝙡.\n\n" +

                            "🎥 **𝙇𝙄𝙉𝙆 𝘿𝙊 𝘾𝘼𝙉𝘼𝙇:**\n" +

                            "𝙀𝙣𝙫𝙞𝙚 𝙤 𝙡𝙞𝙣𝙠 𝙙𝙤 𝙨𝙚𝙪 𝙘𝙖𝙣𝙖𝙡 𝙙𝙤 𝙔𝙤𝙪𝙏𝙪𝙗𝙚.\n\n" +

                            "📹 **𝘾𝙊𝙉𝙏𝙀𝙐́𝘿𝙊𝙎:**\n" +

                            "𝙀𝙣𝙫𝙞𝙚 𝙡𝙞𝙣𝙠𝙨 𝙙𝙤𝙨 𝙨𝙚𝙪𝙨 𝙘𝙤𝙣𝙩𝙚𝙪́𝙙𝙤𝙨.\n\n" +

                            "🔗 **𝙇𝙄𝙉𝙆 𝘿𝙊 𝘿𝙄𝙎𝘾𝙊𝙍𝘿:**\n" +

                            "𝙀𝙣𝙫𝙞𝙚 𝙤 𝙡𝙞𝙣𝙠 𝙙𝙤 𝙨𝙚𝙪 𝙨𝙚𝙧𝙫𝙞𝙙𝙤𝙧 𝙤𝙪 𝙥𝙚𝙧𝙛𝙞𝙡.\n\n" +

                            "📢 **𝘿𝙄𝙑𝙐𝙇𝙂𝘼𝘾̧𝘼̃𝙊:**\n" +

                            "𝙄𝙣𝙛𝙤𝙧𝙢𝙚 𝙤𝙣𝙙𝙚 𝙫𝙤𝙘𝙚̂ 𝙙𝙞𝙫𝙪𝙡𝙜𝙖 𝙖 𝙍𝙀𝘼𝙇 𝙁𝙋𝙕.\n\n" +

                            "━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +

                            "⏳ 𝘼𝙜𝙪𝙖𝙧𝙙𝙚 𝙖 𝙚𝙦𝙪𝙞𝙥𝙚 𝙖𝙣𝙖𝙡𝙞𝙨𝙖𝙧 𝙨𝙪𝙖𝙨 𝙞𝙣𝙛𝙤𝙧𝙢𝙖𝙘̧𝙤̃𝙚𝙨."
                        )

                        .setFooter({

                            text:
                                "𝙍𝙀𝘼𝙇 𝙁𝙋𝙕 • 𝙀𝙦𝙪𝙞𝙥𝙚 𝙙𝙚 𝙑𝙚𝙧𝙞𝙛𝙞𝙘𝙖𝙘̧𝙖̃𝙤"
                        });

                // ==================================================
                // BOTÕES
                // ==================================================

                const aceitar =
                    new ButtonBuilder()

                        .setCustomId(
                            "aceitar_youtuber"
                        )

                        .setLabel(
                            "𝘼𝘾𝙀𝙄𝙏𝙊"
                        )

                        .setEmoji("✅")

                        .setStyle(
                            ButtonStyle.Success
                        );

                const recusar =
                    new ButtonBuilder()

                        .setCustomId(
                            "recusar_youtuber"
                        )

                        .setLabel(
                            "𝙍𝙀𝘾𝙐𝙎𝘼𝘿𝙊"
                        )

                        .setEmoji("❌")

                        .setStyle(
                            ButtonStyle.Danger
                        );

                const fechar =
                    new ButtonBuilder()

                        .setCustomId(
                            "fechar_ticket"
                        )

                        .setLabel(
                            "𝙁𝙀𝘾𝙃𝘼𝙍 𝙏𝙄𝘾𝙆𝙀𝙏"
                        )

                        .setEmoji("🔒")

                        .setStyle(
                            ButtonStyle.Danger
                        );

                const rowDecisao =
                    new ActionRowBuilder()
                        .addComponents(
                            aceitar,
                            recusar
                        );

                const rowFechar =
                    new ActionRowBuilder()
                        .addComponents(
                            fechar
                        );

                // ==================================================
                // ENVIAR TICKET
                // ==================================================

                await ticket.send({

                    content:
                        `${membro}`,

                    embeds: [
                        embedTicket
                    ],

                    components: [
                        rowDecisao,
                        rowFechar
                    ]
                });

                await interaction.editReply({

                    content:
                        "✅ **𝙎𝙚𝙪 𝙩𝙞𝙘𝙠𝙚𝙩 𝙛𝙤𝙞 𝙘𝙧𝙞𝙖𝙙𝙤 𝙘𝙤𝙢 𝙨𝙪𝙘𝙚𝙨𝙨𝙤!**\n\n" +
                        `🎫 ${ticket}`
                });

            } catch (erro) {

                console.log(
                    "======================================"
                );

                console.log(
                    "❌ ERRO AO CRIAR TICKET"
                );

                console.log(erro);

                console.log(
                    "======================================"
                );

                try {

                    if (interaction.deferred) {

                        await interaction.editReply({

                            content:
                                "❌ 𝙊𝙘𝙤𝙧𝙧𝙚𝙪 𝙪𝙢 𝙚𝙧𝙧𝙤𝙧 𝙖𝙤 𝙘𝙧𝙞𝙖𝙧 𝙤 𝙩𝙞𝙘𝙠𝙚𝙩.\n" +
                                "𝙑𝙚𝙧𝙞𝙛𝙞𝙦𝙪𝙚 𝙤 𝘾𝙈𝘿."
                        });
                    }

                } catch {}
            }

            return;
        }

        // ==================================================
        // ACEITAR YOUTUBER
        // ==================================================

        if (
            interaction.customId ===
            "aceitar_youtuber"
        ) {

            if (!podeDecidir(interaction)) {

                return interaction.reply({

                    content:
                        "❌ **𝙎𝙤́ 𝙤𝙨 𝙘𝙖𝙧𝙜𝙤𝙨 𝙖𝙪𝙩𝙤𝙧𝙞𝙯𝙖𝙙𝙤𝙨 𝙥𝙤𝙙𝙚𝙢 𝙖𝙘𝙚𝙞𝙩𝙖𝙧 𝙚𝙨𝙩𝙚 𝙩𝙞𝙘𝙠𝙚𝙩.**",

                    ephemeral: true
                });
            }

            const embedAceito =
                new EmbedBuilder()

                    .setColor("#00FF66")

                    .setTitle(
                        "✅ 𝙔𝙊𝙐𝙏𝙐𝘽𝙀𝙍 𝘼𝘾𝙀𝙄𝙏𝙊"
                    )

                    .setDescription(

                        "🎉 **𝙋𝘼𝙍𝘼𝘽𝙀́𝙉𝙎!**\n\n" +

                        "𝙎𝙪𝙖 𝙨𝙤𝙡𝙞𝙘𝙞𝙩𝙖𝙘̧𝙖̃𝙤 𝙛𝙤𝙞 **𝘼𝘾𝙀𝙄𝙏𝘼** 𝙥𝙚𝙡𝙖 𝙚𝙦𝙪𝙞𝙥𝙚 𝙙𝙖 **𝙍𝙀𝘼𝙇 𝙁𝙋𝙕**.\n\n" +

                        "👑 𝘼𝙜𝙤𝙧𝙖 𝙫𝙤𝙘𝙚̂ 𝙛𝙖𝙯 𝙥𝙖𝙧𝙩𝙚 𝙙𝙤𝙨 𝙔𝙤𝙪𝙏𝙪𝙗𝙚𝙧𝙨 𝙫𝙚𝙧𝙞𝙛𝙞𝙘𝙖𝙙𝙤𝙨."
                    )

                    .setFooter({

                        text:
                            "𝙍𝙀𝘼𝙇 𝙁𝙋𝙕 • 𝘼𝙘𝙚𝙞𝙩𝙤"
                    });

            await interaction.reply({

                embeds: [
                    embedAceito
                ]
            });

            const aceitarDesativado =
                new ButtonBuilder()

                    .setCustomId(
                        "aceitar_youtuber"
                    )

                    .setLabel(
                        "𝘼𝘾𝙀𝙄𝙏𝙊"
                    )

                    .setEmoji("✅")

                    .setStyle(
                        ButtonStyle.Success
                    )

                    .setDisabled(true);

            const recusarDesativado =
                new ButtonBuilder()

                    .setCustomId(
                        "recusar_youtuber"
                    )

                    .setLabel(
                        "𝙍𝙀𝘾𝙐𝙎𝘼𝘿𝙊"
                    )

                    .setEmoji("❌")

                    .setStyle(
                        ButtonStyle.Danger
                    )

                    .setDisabled(true);

            const fechar =
                new ButtonBuilder()

                    .setCustomId(
                        "fechar_ticket"
                    )

                    .setLabel(
                        "𝙁𝙀𝘾𝙃𝘼𝙍 𝙏𝙄𝘾𝙆𝙀𝙏"
                    )

                    .setEmoji("🔒")

                    .setStyle(
                        ButtonStyle.Danger
                    );

            await interaction.message.edit({

                components: [

                    new ActionRowBuilder()
                        .addComponents(
                            aceitarDesativado,
                            recusarDesativado
                        ),

                    new ActionRowBuilder()
                        .addComponents(
                            fechar
                        )
                ]
            });

            return;
        }

        // ==================================================
        // RECUSAR YOUTUBER
        // ==================================================

        if (
            interaction.customId ===
            "recusar_youtuber"
        ) {

            if (!podeDecidir(interaction)) {

                return interaction.reply({

                    content:
                        "❌ **𝙎𝙤́ 𝙤𝙨 𝙘𝙖𝙧𝙜𝙤𝙨 𝙖𝙪𝙩𝙤𝙧𝙞𝙯𝙖𝙙𝙤𝙨 𝙥𝙤𝙙𝙚𝙢 𝙧𝙚𝙘𝙪𝙨𝙖𝙧 𝙚𝙨𝙩𝙚 𝙩𝙞𝙘𝙠𝙚𝙩.**",

                    ephemeral: true
                });
            }

            const embedRecusado =
                new EmbedBuilder()

                    .setColor("#FF0000")

                    .setTitle(
                        "❌ 𝙔𝙊𝙐𝙏𝙐𝘽𝙀𝙍 𝙍𝙀𝘾𝙐𝙎𝘼𝘿𝙊"
                    )

                    .setDescription(

                        "❌ **𝙎𝙐𝘼 𝙎𝙊𝙇𝙄𝘾𝙄𝙏𝘼𝘾̧𝘼̃𝙊 𝙁𝙊𝙄 𝙍𝙀𝘾𝙐𝙎𝘼𝘿𝘼.**\n\n" +

                        "𝙎𝙪𝙖 𝙫𝙚𝙧𝙞𝙛𝙞𝙘𝙖𝙘̧𝙖̃𝙤 𝙙𝙚 𝙔𝙤𝙪𝙏𝙪𝙗𝙚𝙧 𝙣𝙖̃𝙤 𝙛𝙤𝙞 𝙖𝙥𝙧𝙤𝙫𝙖𝙙𝙖 𝙥𝙚𝙡𝙖 𝙚𝙦𝙪𝙞𝙥𝙚.\n\n" +

                        "📋 𝙑𝙚𝙧𝙞𝙛𝙞𝙦𝙪𝙚 𝙖𝙨 𝙞𝙣𝙛𝙤𝙧𝙢𝙖𝙘̧𝙤̃𝙚𝙨 𝙚𝙣𝙫𝙞𝙖𝙙𝙖𝙨 𝙚 𝙩𝙚𝙣𝙩𝙚 𝙣𝙤𝙫𝙖𝙢𝙚𝙣𝙩𝙚 𝙨𝙚 𝙣𝙚𝙘𝙚𝙨𝙨𝙖́𝙧𝙞𝙤."
                    )

                    .setFooter({

                        text:
                            "𝙍𝙀𝘼𝙇 𝙁𝙋𝙕 • 𝙍𝙚𝙘𝙪𝙨𝙖𝙙𝙤"
                    });

            await interaction.reply({

                embeds: [
                    embedRecusado
                ]
            });

            const aceitarDesativado =
                new ButtonBuilder()

                    .setCustomId(
                        "aceitar_youtuber"
                    )

                    .setLabel(
                        "𝘼𝘾𝙀𝙄𝙏𝙊"
                    )

                    .setEmoji("✅")

                    .setStyle(
                        ButtonStyle.Success
                    )

                    .setDisabled(true);

            const recusarDesativado =
                new ButtonBuilder()

                    .setCustomId(
                        "recusar_youtuber"
                    )

                    .setLabel(
                        "𝙍𝙀𝘾𝙐𝙎𝘼𝘿𝙊"
                    )

                    .setEmoji("❌")

                    .setStyle(
                        ButtonStyle.Danger
                    )

                    .setDisabled(true);

            const fechar =
                new ButtonBuilder()

                    .setCustomId(
                        "fechar_ticket"
                    )

                    .setLabel(
                        "𝙁𝙀𝘾𝙃𝘼𝙍 𝙏𝙄𝘾𝙆𝙀𝙏"
                    )

                    .setEmoji("🔒")

                    .setStyle(
                        ButtonStyle.Danger
                    );

            await interaction.message.edit({

                components: [

                    new ActionRowBuilder()
                        .addComponents(
                            aceitarDesativado,
                            recusarDesativado
                        ),

                    new ActionRowBuilder()
                        .addComponents(
                            fechar
                        )
                ]
            });

            return;
        }

        // ==================================================
        // FECHAR TICKET
        // ==================================================

        if (
            interaction.customId ===
            "fechar_ticket"
        ) {

            try {

                const canal =
                    interaction.channel;

                const embedFechando =
                    new EmbedBuilder()

                        .setColor("#FF0000")

                        .setTitle(
                            "🔒 𝙏𝙄𝘾𝙆𝙀𝙏 𝙎𝙀𝙍𝘼́ 𝙁𝙀𝘾𝙃𝘼𝘿𝙊"
                        )

                        .setDescription(

                            "🔴 𝙀𝙨𝙩𝙚 𝙩𝙞𝙘𝙠𝙚𝙩 𝙨𝙚𝙧𝙖́ 𝙛𝙚𝙘𝙝𝙖𝙙𝙤 𝙚𝙢 **𝟱 𝙨𝙚𝙜𝙪𝙣𝙙𝙤𝙨**.\n\n" +

                            "𝙊𝙗𝙧𝙞𝙜𝙖𝙙𝙤 𝙥𝙤𝙧 𝙚𝙣𝙩𝙧𝙖𝙧 𝙚𝙢 𝙘𝙤𝙣𝙩𝙖𝙩𝙤 𝙘𝙤𝙢 𝙖 **𝙍𝙀𝘼𝙇 𝙁𝙋𝙕**."
                        );

                await interaction.reply({

                    embeds: [
                        embedFechando
                    ]
                });

                setTimeout(
                    async () => {

                        try {

                            await canal.delete();

                            console.log(
                                `🗑️ Ticket excluído: ${canal.name}`
                            );

                        } catch {

                            console.log(
                                "❌ Não foi possível excluir o ticket."
                            );
                        }

                    },
                    5000
                );

            } catch (erro) {

                console.log(
                    "❌ ERRO AO FECHAR TICKET:"
                );

                console.log(erro);
            }
        }
    }
);

// ==================================================
// COMANDOS
// ==================================================

client.on(
    "messageCreate",
    async message => {

        if (message.author.bot) {
            return;
        }

        // ==================================================
        // !PING
        // ==================================================

        if (
            message.content === "!ping"
        ) {

            const mensagem =
                await message.reply(
                    "🏓 **𝙋𝙤𝙣𝙜!**"
                );

            const ping =
                mensagem.createdTimestamp -
                message.createdTimestamp;

            await mensagem.edit(

                `🏓 **𝙋𝙤𝙣𝙜!**\n` +
                `⚡ 𝙇𝙖𝙩𝙚̂𝙣𝙘𝙞𝙖: **${ping}ms**`
            );
        }

        // ==================================================
        // !PAINEL
        // ==================================================

        if (
            message.content === "!painel"
        ) {

            if (
                !message.member.permissions.has(
                    PermissionsBitField.Flags.Administrator
                )
            ) {

                return message.reply(
                    "❌ 𝙑𝙤𝙘𝙚̂ 𝙥𝙧𝙚𝙘𝙞𝙨𝙖 𝙨𝙚𝙧 𝙖𝙙𝙢𝙞𝙣𝙞𝙨𝙩𝙧𝙖𝙙𝙤𝙧 𝙥𝙖𝙧𝙖 𝙪𝙨𝙖𝙧 𝙚𝙨𝙩𝙚 𝙘𝙤𝙢𝙖𝙣𝙙𝙤."
                );
            }

            try {

                const painel =
                    await message.channel.send(
                        criarPainel()
                    );

                try {

                    await painel.pin();

                } catch {

                    console.log(
                        "⚠️ Não foi possível fixar o painel."
                    );
                }

                try {

                    await message.delete();

                } catch {

                    console.log(
                        "⚠️ Não foi possível apagar o comando."
                    );
                }

                console.log(
                    "✅ Novo painel enviado com sucesso."
                );

            } catch (erro) {

                console.log(
                    "❌ ERRO AO ENVIAR PAINEL:"
                );

                console.log(erro);
            }
        }
    }
);

// ==================================================
// LOGIN RAILWAY
// ==================================================

if (!process.env.TOKEN) {

    console.log(
        "❌ ERRO: A variável TOKEN não foi encontrada no Railway."
    );

    process.exit(1);
}

client.login(process.env.TOKEN)

    .then(() => {

        console.log(
            "🔄 Conectando o REAL FPZ BOT..."
        );

    })

    .catch(erro => {

        console.log(
            "======================================"
        );

        console.log(
            "❌ ERRO AO CONECTAR O BOT"
        );

        console.log(
            "======================================"
        );

        console.log(erro);

        console.log(
            "======================================"
        );
    });
