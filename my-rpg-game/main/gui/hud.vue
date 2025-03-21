<template>
    <div class="companion-hud">
        <p>Companheiro: {{ companion }}</p>
    </div>
</template>

<script>
    export default {
        name: 'companion-hud',
        inject: ['rpgCurrentPlayer'],
        data() {
            return {
                companion: ''
            }
        },
        mounted() {
            this.obsCurrentPlayer = this.rpgCurrentPlayer
                .subscribe(({ object }) => {
                    if (object.variables && object.variables.companion) {
                        this.companion = object.variables.companion
                    }
                })
        },
        unmounted() {
            this.obsCurrentPlayer.unsubscribe()
        }
    }
</script>

<style>
    .companion-hud {
        width: 100%;
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 18px;
        font-weight: bold;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
    }
</style>