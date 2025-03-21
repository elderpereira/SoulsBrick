import { RpgPlayer, type RpgPlayerHooks, Control, Components, RpgShape } from '@rpgjs/server'
import ControlsHud from './gui/ControlsHud.vue'
import BattleHud from './gui/BattleHud.vue'

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'Dirr'
        player.setComponentsTop(Components.text('{name}'))
        player.setVariable('movementCounter', 0)
        player.setVariable('companion', '') // Inicializa a variável companion
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },

    async onJoinMap(player: RpgPlayer) {
        if (player.getVariable('AFTER_INTRO')) {
            player.gui('companion-hud').open()
            player.gui('controls-hud').open() // Abre a nova HUD de controles
            return
        }
        player.setVariable('AFTER_INTRO', true)

        // Escolha do companheiro
        const choice = await player.showChoices('Escolha seu companheiro:', [
            { text: 'Espírito Pedra', value: 'pedra' },
            { text: 'Espírito Papel', value: 'papel' },
            { text: 'Espírito Tesoura', value: 'tesoura' }
        ])

        player.setVariable('companion', choice.value)
        player.showNotification(`Você escolheu o Espírito ${choice.text}.`, {
            time: 2000
        })
        player.gui('companion-hud').open()
        player.gui('controls-hud').open() // Abre a nova HUD de controles
    },
    onInShape(player: RpgPlayer, shape: RpgShape) {
        if (shape.name.includes('caca')) {
            player.showNotification('Entrando em área de caça.', {
                time: 2000, // Tempo em milissegundos
                //icon: 'icon-id', // Opcional: ID do ícone
                //sound: 'sound-id' // Opcional: ID do som
            })
            player.setVariable('inHuntingArea', true)
        }
    },
    onOutShape(player: RpgPlayer, shape: RpgShape) {
        if (shape.name.includes('caca')) {
            player.showNotification('Saindo da área de caça.', {
                time: 2000, // Tempo em milissegundos
                //icon: 'icon-id', // Opcional: ID do ícone
                //sound: 'sound-id' // Opcional: ID do som
            })
            player.setVariable('inHuntingArea', false)
        }
    },
    onMove(player: RpgPlayer) {
        if (player.getVariable('inHuntingArea')) {
            let movementCounter = player.getVariable('movementCounter') || 0
            movementCounter += 1
            if (movementCounter >= 32) {
                movementCounter = 0
                // Verifica se encontra um espírito elemental
                if (Math.random() < 0.7) { // 70% de chance de encontrar um espírito elemental
                    player.showNotification('Você encontrou um espírito elemental!', {
                        time: 2000, // Tempo em milissegundos
                        //icon: 'icon-id', // Opcional: ID do ícone
                        //sound: 'sound-id' // Opcional: ID do som
                    })
                    player.gui('companion-hud').close()
                    player.gui('controls-hud').close()
                    player.gui('battle-hud').open()
                    player.controls.stopInputs() // Desativa a movimentação do jogador
                }
            }
            player.setVariable('movementCounter', movementCounter)
        }
    },
    onGuiClosed(player: RpgPlayer, gui: string) {
        if (gui === 'battle-hud') {
            player.gui('companion-hud').open()
            player.gui('controls-hud').open()
            player.controls.startInputs() // Reativa a movimentação do jogador
        }
    }
}

export default player