function deleteConversations() {
    let buttons = document.querySelectorAll('[aria-label^="More options for"]'); 
    let i = 0;

    function clickNext() {
        if (i >= buttons.length) {
            console.log("Done deleting (or scroll to load more chats).");
            return;
        }
        buttons[i].click();
        setTimeout(() => {
            let deleteButton = Array.from(document.querySelectorAll('span'))
                .find(el => el.textContent.includes("Delete Chat")); // <- updated case
            if (deleteButton) {
                deleteButton.click();
                console.log("Clicked Delete Chat for conversation", i + 1);
            }

            setTimeout(() => {
                let confirmBtn = Array.from(document.querySelectorAll('span'))
                    .find(el => el.textContent === "Delete");
                if (confirmBtn) {
                    confirmBtn.click();
                    console.log("Confirmed delete for conversation", i + 1);
                }

                i++;
                setTimeout(clickNext, 3000); // wait before next deletion
            }, 1500);
        }, 1500);
    }

    clickNext();
}
deleteConversations();
