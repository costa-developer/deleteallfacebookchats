function deleteConversations() {
    const buttons = document.querySelectorAll('[aria-label^="More options for"]'); 
    let i = 0;

    function clickNext() {
        if (i >= buttons.length) {
            console.log("Done deleting all visible conversations (scroll to load more if needed).");
            return;
        }

        const currentButton = buttons[i];
        if (!currentButton) {
            console.warn("Button not found for conversation", i + 1);
            i++;
            return clickNext();
        }

        currentButton.click();
        console.log("Clicked More Options for conversation", i + 1);

        setTimeout(() => {
            // Find Delete Chat option
            const deleteButton = Array.from(document.querySelectorAll('span'))
                .find(el => /Delete Chat/i.test(el.textContent));
            
            if (deleteButton) {
                deleteButton.click();
                console.log("Clicked Delete Chat for conversation", i + 1);

                setTimeout(() => {
                    // Confirm deletion
                    const confirmBtn = Array.from(document.querySelectorAll('span'))
                        .find(el => /^Delete$/i.test(el.textContent));

                    if (confirmBtn) {
                        confirmBtn.click();
                        console.log("Confirmed delete for conversation", i + 1);
                    } else {
                        console.warn("Confirm button not found for conversation", i + 1);
                    }

                    i++;
                    setTimeout(clickNext, 2000); // delay before next
                }, 1000);
            } else {
                console.warn("Delete Chat option not found for conversation", i + 1);
                i++;
                setTimeout(clickNext, 1000);
            }
        }, 1000);
    }

    clickNext();
}

// Start deletion
deleteConversations();
