import MotionDiv from '../../../components/MotionDiv';
import A from '../../../components/A';

export default function RefundPolicy() {
    return (
        <main>
            <section id="refund-policy" className="sm max-w-200">

                <MotionDiv
                    variant="up"
                    styles="flex flex-col gap-4 items-center w-full"
                >
                    <h1 className="text-center">Refund Policy</h1>
                    <p className="text-center"><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
                </MotionDiv>

                <MotionDiv
                    variant="up"
                    del={0.5}
                    styles="w-full"
                >
                    <p>
                        All products sold on this website are digital goods that are delivered instantly upon purchase. Because of this, all sales are final and non-refundable.<br /><br />
                        Once a product has been downloaded or accessed, it cannot be returned, exchanged, or refunded. Please review product descriptions, previews, and compatibility requirements carefully before purchasing.<br /><br />
                        If you have any questions before placing your order, feel free to reach out. I will be happy to provide clarification to help you make an informed decision.<br /><br />
                        If you encounter technical issues accessing your purchase, please <A title="contact me" link="/contact" /> and I will provide support to ensure you receive the product as intended.
                    </p>
                </MotionDiv>

            </section>
        </main>
    );
}