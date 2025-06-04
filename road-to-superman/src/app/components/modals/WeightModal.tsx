"use client";
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { useApp } from "../../context/AppContext";

interface WeightModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WeightModal({ isOpen, onOpenChange }: WeightModalProps) {
  const { userData, updateUserData } = useApp();
  const [weight, setWeight] = useState(userData.currentWeight);
  const [error, setError] = useState("");
  const [history, setHistory] = useState(userData.weightHistory || []);

  useEffect(() => {
    if (isOpen) {
      setWeight(userData.currentWeight);
      setHistory(userData.weightHistory || []);
    }
  }, [isOpen, userData.currentWeight, userData.weightHistory]);

  const handleSave = () => {
    if (weight < 50 || weight > 200) {
      setError("Le poids doit être compris entre 50 et 200 kg.");
      return;
    }
    const newEntry = { date: new Date().toLocaleDateString('fr-FR'), value: weight };
    const newHistory = [...(userData.weightHistory || []), newEntry];
    updateUserData({ currentWeight: weight, weightHistory: newHistory });
    setError("");
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Suivi du Poids</ModalHeader>
        <ModalBody>
          <Input
            type="number"
            min={50}
            max={200}
            label="Poids actuel (kg)"
            value={weight.toString()}
            onChange={e => setWeight(Number(e.target.value))}
            autoFocus
          />
          {error && <div style={{ color: 'red', fontSize: 13 }}>{error}</div>}
          <div style={{ marginTop: 20 }}>
            <h4>Historique</h4>
            {history.length === 0 ? (
              <div style={{ color: '#888' }}>Aucun historique disponible</div>
            ) : (
              <ul style={{ maxHeight: 120, overflowY: 'auto', padding: 0 }}>
                {history.slice(-5).reverse().map((entry: {date: string, value: number}, i: number) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-card, #222)', padding: 8, borderRadius: 6, marginBottom: 4 }}>
                    <span>{entry.date}</span>
                    <span style={{ color: 'var(--accent-blue, #3b82f6)' }}>{entry.value} kg</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={() => onOpenChange(false)}>Annuler</Button>
          <Button color="primary" onPress={handleSave}>Enregistrer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 