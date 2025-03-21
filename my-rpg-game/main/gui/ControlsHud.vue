<script lang="ts">
import { Control, Direction } from '@rpgjs/client'

const DIRECTIONS = {
    w: Direction.Up,
    a: Direction.Left,
    s: Direction.Down,
    d: Direction.Right
}

export default {
    name: 'controls-hud',
    inject: ['rpgEngine'],
    mounted() {
        window.addEventListener('keydown', this.handleKeydown)
        window.addEventListener('keyup', this.handleKeyup)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeydown)
        window.removeEventListener('keyup', this.handleKeyup)
    },
    methods: {
        handleKeydown(event) {
            const direction = DIRECTIONS[event.key.toLowerCase()]
            if (direction) {
                this.rpgEngine.controls.applyControl(direction, true)
            }
        },
        handleKeyup(event) {
            const direction = DIRECTIONS[event.key.toLowerCase()]
            if (direction) {
                this.rpgEngine.controls.applyControl(direction, false)
            }
        }
    }
}
</script>
