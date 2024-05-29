<template>
    <div class="flex">
        <div class="w-fit">
            <instructor-sidebar />
        </div>
        <div class="overflow-x-auto grow">
            <instructor-header />
            <main>
                <router-view />
            </main>
        </div>
    </div>
</template>
