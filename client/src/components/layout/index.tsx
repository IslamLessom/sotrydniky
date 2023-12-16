import { Layout as AntLayout } from 'antd'
import styles from './index.module.css'

type Props = {
    children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
    return (
        <div className={styles.main}>
            <AntLayout style={{ height: '100%', backgroundColor: '#141414' }}>
                {
                    children
                }
            </AntLayout>
        </div>
    )
}
