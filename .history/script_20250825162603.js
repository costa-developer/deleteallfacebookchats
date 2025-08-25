function deleteAllChats() {
    let deletedCount = 0;

    async function processChats() {
        const buttons = document.querySelectorAll('[aria-label^="More options for"]');

        if (buttons.length === 0) {
            console.log("No more chats found.");
            return;
        }

        for (let i = 0; i < buttons.length; i++) {
            const currentButton = buttons[i];
            currentButton.click();
            console.log("Clicked More Options for conversation", deletedCount + 1);

            await new Promise(r => setTimeout(r, 1000));

            const deleteButton = Array.from(document.querySelectorAll('span'))
                .find(el => /Delete Chat/i.test(el.textContent));
            
            if (deleteButton) {
                deleteButton.click();
                console.log("Clicked Delete Chat for conversation", deletedCount + 1);
                await new Promise(r => setTimeout(r, 1000));

                const confirmBtn = Array.from(document.querySelectorAll('span'))
                    .find(el => /^Delete$/i.test(el.textContent));
                
                if (confirmBtn) {
                    confirmBtn.click();
                    console.log("Confirmed delete for conversation", deletedCount + 1);
                }
            }

            deletedCount++;
            await new Promise(r => setTimeout(r, 1500));
        }

        // Scroll down to load more chats
        window.scrollBy(0, window.innerHeight);
        console.log("Scrolled to load more chats...");

        // Wait for new chats to load
        await new Promise(r => setTimeout(r, 3000));

        // Recursively process newly loaded chats
        processChats();
    }

    processChats();
}

deleteAllChats();