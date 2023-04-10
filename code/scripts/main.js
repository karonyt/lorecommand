import { world, ItemStack } from "@minecraft/server";

const prefix = "?l_"
world.events.beforeChat.subscribe(chat => {
    const { sender: player, message } = chat;
    if (!message.startsWith(prefix)) return;
    if (!player.hasTag("lore")) { 
      player.sendMessage("§cloreTagが付いてないためこのコマンドは使えません")
      chat.cancel = true;
      return;
    }
  
    chat.cancel = true;
    const command = message.slice(prefix.length).split(" ")[0];
    const args = message.slice(prefix.length + command.length + 1).split(/\n/);

    switch (command) {
        case "set": {
            const item = player.getComponent("inventory").container.getItem(player.selectedSlot);
            if (!item) { 
              player.sendMessage("§cアイテムを持っていません")
              return;
            }
            item.setLore(args);
            player.getComponent("inventory").container.setItem(player.selectedSlot,item);
            player.sendMessage(`§a手持ちのアイテムの説明文を ${args} §r§aにしました`)
            break;
        }
        default: {
            player.sendMessage("そのようなコマンドはありません。");
            break;
        }
    }
});
