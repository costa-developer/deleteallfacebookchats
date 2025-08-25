async function deleteAllChats() {
    let deletedCount = 0;

    // Helper function to wait
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to click "More Options" menu
    function getMenuButtons() {
        return document.querySelectorAll('[aria-label^="More options for"]');
    }

    function getElementByXpath(path) {
        return document.evaluate(
            path,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
    }

    async function deleteChat(button) {
        try {
            button.click();
            await wait(1000);

            const deleteOption = getElementByXpath('//span[text()="Delete Chat" or text()="Delete chat"]');
            if (!deleteOption) return false;
            deleteOption.click();
            await wait(1000);

            const confirmBtn = getElementByXpath('//div[(@aria-label="Delete Chat" and @tabindex="0") or (@aria-label="Delete chat" and @tabindex="0")]');
            if (!confirmBtn) return false;
            confirmBtn.click();
            await wait(1500);

            deletedCount++;
            console.log(`Deleted conversation #${deletedCount}`);
            return true;
        } catch (err) {
            console.error("Error deleting chat:", err);
            return false;
        }
    }

    let buttons = getMenuButtons();

    while (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
            await deleteChat(buttons[i]);
        }

        // Scroll down to load more chats
        window.scrollBy(0, window.innerHeight);
        await wait(2000);

        buttons = getMenuButtons();
    }

    console.log("All visible chats deleted!");
}

deleteAllChats();
