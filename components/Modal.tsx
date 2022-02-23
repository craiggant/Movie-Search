import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import styles from '../styles/Modal.module.css'

type Props = {
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<Props> = ({isActive, setIsActive, children}) => {
  const handleClick = ():void => setIsActive(false);

  return (
		<AnimatePresence>
			{isActive && (
				<>
					<motion.div
            className={styles.modalWrapper}
						drag="y"
						dragConstraints={{ top: 0, bottom: 0 }}
						onDragEnd={(_, info) => {
              // watches drag event and sets false when drag shows sufficient length
							if (info.offset.y > 300) setIsActive(false);
						}}
            onClick={handleClick}
					>
						<motion.div
							exit={{ opacity: 0.5, y: '110%' }}
							initial={{ opacity: 0.5, y: '110%' }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ bounce: .06,  type: 'spring', duration: .3}}
						>
							<div className={styles.modal}>
								{children}
							</div>
						</motion.div>
					</motion.div>
					<motion.div
						className={styles.modalBackground}
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

export default Modal
