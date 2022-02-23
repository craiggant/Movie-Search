import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import styles from '../styles/Drawer.module.css'

type Props = {
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Drawer: React.FC<Props> = ({isActive, setIsActive, children}) => {
  const handleClick = ():void => setIsActive(false);

  return (
		<AnimatePresence>
			{isActive && (
				<>
					<motion.div
            className={styles.drawerWrapper}
						drag="y"
						dragConstraints={{ top: 0, bottom: 0 }}
						onDragEnd={(_, info) => {
							// watches drag event and sets false when drag shows sufficient length
							if (info.offset.y > 300) setIsActive(false);
						}}
					>
						<motion.div
							exit={{ opacity: 0.5, y: '110%' }}
							initial={{ opacity: 0.5, y: '110%' }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ bounce: .06,  type: 'spring', duration: .3}}
						>
							<div className={styles.drawer}>
								{children}
							</div>
						</motion.div>
					</motion.div>
					<motion.div
						className={styles.drawerBackground}
						onClick={handleClick}
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					/>
				</>
			)}
		</AnimatePresence>
  );
}

export default Drawer
