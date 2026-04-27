import SubInfo from '../../../components/SubInfo';
import MotionDiv from '../../../components/MotionDiv';

export default function Resources() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <SubInfo title="Halaman ini" subtitle="Halaman ini memamerkan tools, stack, dan setup yang saya gunakan." />
            <div className="space-y-10 mt-10">
                <MotionDiv>
                    <section>
                        <h2 className="text-2xl font-bold mb-2">Stack</h2>
                        <p className="text-muted-foreground">[Placeholder] Daftar teknologi, framework, dan library yang saya gunakan.</p>
                    </section>
                </MotionDiv>
                <MotionDiv>
                    <section>
                        <h2 className="text-2xl font-bold mb-2">Desk Setup</h2>
                        <p className="text-muted-foreground">[Placeholder] Foto/meja kerja, monitor, keyboard, mouse, dsb.</p>
                    </section>
                </MotionDiv>
                <MotionDiv>
                    <section>
                        <h2 className="text-2xl font-bold mb-2">Software</h2>
                        <p className="text-muted-foreground">[Placeholder] Aplikasi dan software favorit untuk produktivitas, coding, desain, dll.</p>
                    </section>
                </MotionDiv>
                <MotionDiv>
                    <section>
                        <h2 className="text-2xl font-bold mb-2">Hardware</h2>
                        <p className="text-muted-foreground">[Placeholder] Hardware utama yang digunakan sehari-hari.</p>
                    </section>
                </MotionDiv>
            </div>
        </main>
    );
}