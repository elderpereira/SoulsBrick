import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'caca1'
})
export default class Caca1Event extends RpgEvent {
    async onPlayerEnter(player: RpgPlayer) {
        await player.showText('Entrando em área de caça nível 1.', {
            talkWith: this
        })
    }

    async onPlayerLeave(player: RpgPlayer) {
        await player.showText('Saindo da área de caça nível 1.', {
            talkWith: this
        })
    }
}