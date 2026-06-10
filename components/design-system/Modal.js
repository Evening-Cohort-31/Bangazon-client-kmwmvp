export const Modal = ({
    isOpen,
    title,
    onClose,
    children,
    footer,
    onConfirm,
    confirmText = "Confirm",
    confirmColor = "danger",
    cancelText = "Cancel",
}) => {
    if (!isOpen) return null

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose} />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button type="button" className="delete" aria-label="close" onClick={onClose} />
                </header>

                <section className="modal-card-body">
                    {children}
                </section>

                {(footer !== undefined || onConfirm) && (
                    <footer className="modal-card-foot">
                        {footer ?? (
                            <>
                                <button
                                    type="button"
                                    className={`button is-${confirmColor}`}
                                    onClick={onConfirm}
                                >
                                    {confirmText}
                                </button>
                                <button
                                    type="button"
                                    className="button"
                                    onClick={onClose}
                                >
                                    {cancelText}
                                </button>
                            </>
                        )}
                    </footer>
                )}
            </div>
        </div>
    )
}
